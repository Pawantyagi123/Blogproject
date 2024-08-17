import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import Container from '../components/Container';
import PostCard from '../components/PostCard';
import authService from "../appwrite/auth";

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in
        authService.getCurrentUser().then(user => {
            setIsLoggedIn(!!user);
        });

        // Fetch posts
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <div className="w-full py-8 px-4 md:px-8">
            <Container>
                <div className="mb-8 text-center">
                    {isLoggedIn ? (
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 hover:text-gray-600">
                            Create Post
                        </h1>
                    ) : (
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 hover:text-gray-600">
                            Login to read posts
                        </h1>
                    )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;

