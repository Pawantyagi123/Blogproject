import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import Button from "../components/Button";
import Container from "../components/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 px-4 md:px-8">
            <Container>
                <div className="relative mb-6 border rounded-xl overflow-hidden">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-auto object-cover rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute top-4 right-4 flex space-x-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="px-4 py-2 text-white rounded-md">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className="px-4 py-2 text-white rounded-md">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold">{post.title}</h1>
                </div>

                <div className="prose prose-slate max-w-full">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
