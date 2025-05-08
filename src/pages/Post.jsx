import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";


function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
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

  const imageUrl = post?.featuredImage? service.getFileView(post?.featuredImage): "";

  return post ? (
    <div className="max-w-6xl mx-auto px-4 md:py-10 py-5 flex flex-col md:flex-row gap-8">
      <div className="flex flex-col items-center gap-5 md:w-1/3">
        <div className="w-full aspect-[4/3] bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-contain"
          />
        </div>
        {isAuthor && (
          <div className="md:flex hidden  gap-3 mt-2">
            <Link to={`/edit-post/${post.$id}`}>
                <button className="inline-flex items-center px-4 py-1 rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200">
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
      <div className="flex-1 prose max-w-none">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-base leading-relaxed">{parse(post.content)}</div>
      </div>
      {isAuthor && (
          <div className="flex md:hidden  gap-5 mt-2">
            <Link to={`/edit-post/${post.$id}`}>
                <button className="inline-flex items-center px-4 py-1 rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200">
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
