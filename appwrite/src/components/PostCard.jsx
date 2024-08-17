import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="block w-full">
            <div className="bg-gray-100 rounded-xl p-4 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="w-full flex justify-center mb-4">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="rounded-xl object-cover w-full h-40 md:h-48 lg:h-56"
                    />
                </div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
