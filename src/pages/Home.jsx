import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard.jsx";
import service from "../appwrite/config";
import Loading from "../components/Loading.jsx";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const post = await service.getPosts();
        if (post) {
          setPosts(post.documents);
        }
      } catch (err) {
        console.error("Appwrite service :: getPosts() :: ", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-10 text-blue-600"><Loading/></div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="w-full min-h-[87vh] px-8 md:py-8 py-6">
        <div className="flex flex-wrap md:justify-start justify-center md:gap-4 gap-4 items-center">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className="w-full text-center text-gray-500">No posts found</div>
          )}
        </div>
    </div>
  );
}

export default Home;
