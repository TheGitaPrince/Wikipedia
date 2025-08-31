import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loading from "../components/Loading.jsx";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      service
        .getPost(slug)
        .then((post) => {
          if (post) setPost(post);
          else navigate("/");
        })
        .finally(() => setLoading(false));
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const imageUrl = post?.featuredImage
    ? service.getFileView(post?.featuredImage)
    : "";

   if (loading) {
    return (
      <div className="flex justify-center py-10 text-blue-600">
        <Loading />
      </div>
    );
  }

  return post ? (
    <div className="max-w-6xl mx-auto px-4 md:py-10 py-5 flex flex-col md:flex-row md:gap-8 gap-3">
      <div className="flex flex-col items-center md:w-1/3">
        <div className="w-full aspect-[4/3] bg-blue-100/90 rounded-lg shadow overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-contain"
          />
        </div>
        {isAuthor && (
          <div className="md:flex hidden gap-3 mt-5">
            <Link to={`/edit-post/${post.$id}`}>
              <button className="inline-flex items-center px-4 py-1 rounded-full border border-blue-950/100 text-blue-950/90 hover:bg-blue-950/100 hover:text-white transition-all duration-200">
                Edit
              </button>
            </Link>
            <button
              onClick={deletePost}
              className="inline-flex items-center px-4 py-1 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="flex-1 prose max-w-none mb-3">
        <h1 className="text-2xl mb-2 font-semibold font-serif text-blue-950/90">{post.title}</h1>
        <div className="text-blue-950/90 font-serif leading-relaxed">{parse(post.content)}</div>
      </div>
      {isAuthor && (
        <div className="flex md:hidden gap-5 ">
          <Link to={`/edit-post/${post.$id}`}>
            <button className="inline-flex items-center px-4 py-1 rounded-full border border-blue-950/100 text-blue-950/90 hover:bg-blue-950/90 hover:text-white transition-all duration-200">
              Edit
            </button>
          </Link>
          <button
            onClick={deletePost}
            className="inline-flex items-center px-4 py-1 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  ) : null;
}

export default Post;
