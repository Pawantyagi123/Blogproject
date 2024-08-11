import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import Container from '../components/Container';
import PostCard from '../components/PostCard';
import authService from "../appwrite/auth"; // Import the AuthService

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in
        authService.getCurrentUser().then(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        // Fetch posts
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {isLoggedIn ? (
                        <div className="w-full p-2">
                            <h1 className="text-center text-2xl font-bold hover:text-gray-500">
                                Create Post
                            </h1>
                        </div>
                    ) : (
                        <div className="w-full p-2">
                            <h1 className="text-center text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
