import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import PostCard from '../components/PostCard';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts when component mounts
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <div className='w-full py-8 px-4 md:px-8'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
