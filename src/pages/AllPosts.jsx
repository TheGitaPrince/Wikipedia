import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; 
import PostCard from "../components/PostCard.jsx";
import service from "../appwrite/config";
import { Query } from "appwrite";
import Loading from "../components/Loading.jsx";


const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
   
  useEffect(() => {
    if (!userData) {
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const post = await service.getPosts([Query.equal("userId", userData.$id)]);
        if (post) {
          setPosts(post.documents);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userData]);

  if (loading) {
    return <div className="flex justify-center py-10 text-blue-600"><Loading/></div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="w-full min-h-[87vh] px-14 md:py-5 py-3">
        <h2 className="text-xl font-semibold mb-2">Your Posts</h2>
        <div className="flex flex-wrap md:justify-start justify-center md:gap-3 gap-5 items-center">
          {posts.length > 0 ? (
            posts.map((post) => (
                <PostCard key={post.$id} {...post} />
            ))
          ) : (
            <div className="w-full text-center text-gray-500">No posts found</div>
          )}
        </div>
    </div>
  );
};

export default AllPosts;
