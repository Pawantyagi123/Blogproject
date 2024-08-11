import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../Button.jsx";
import Input from "../Input.jsx";
import RTE from "../RTE.jsx";
import Select from "../Select.jsx";
import appwriteService from "../../appwrite/config";
import toast from "react-hot-toast";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const slugTransform = useCallback((value) => {
        return value && typeof value === "string"
            ? value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s+/g, "-")
            : "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const handleFileUpload = async (file) => {
        if (!file) return null;
        try {
            const uploadedFile = await appwriteService.uploadFile(file);
            return uploadedFile.$id;
        } catch (error) {
            console.error("File upload failed:", error);
            return null;
        }
    };

    const handleDeleteFile = async (fileId) => {
        if (!fileId) return;
        try {
            await appwriteService.deleteFile(fileId);
        } catch (error) {
            console.error("File deletion failed:", error);
        }
    };

    const submit = async (data) => {
        try {
            let fileId = post?.featuredImage;
            if (data.image?.[0]) {
                fileId = await handleFileUpload(data.image[0]);
                if (post?.featuredImage && fileId) {
                    await handleDeleteFile(post.featuredImage);
                }
            }

            const payload = {
                ...data,
                featuredImage: fileId,
                userId: userData?.$id,
            };

            let dbPost;
            if (post) {
                dbPost = await appwriteService.updatePost(post.$id, payload);
            } else {
                dbPost = await appwriteService.createPost(payload);
            }

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
                toast.success("Post uploaded Successfully")
            }
        } catch (error) {
            console.error("Post submission failed:", error);
            toast.error("Post submission failed");
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
