import React from "react";
import service from "../appwrite/config.js";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function PostCard({ $id, title, content, featuredImage }) {
  const imageUrl = featuredImage ? service.getFileView(featuredImage) : "";
  const url = `/post/${$id}`;

  return (
    <Link to={url} className="block transition-transform hover:scale-105">
      <div className="bg-blue-50/90 h-72 md:w-[350px] w-[360px] shadow-md shadow-blue-100 flex flex-col gap-2 p-4 rounded-lg border border-blue-300 hover:border-blue-400 transition-all">
        <h2 className="text-xl font-bold font-serif text-blue-950/90 truncate mb-1">
          {title}
        </h2>
        <div className="h-40 w-full flex items-center justify-center rounded bg-blue-100/80 mb-2 overflow-hidden">
          <img
            className="max-h-full max-w-full object-contain rounded"
            src={imageUrl}
            alt={title}
          />
        </div>
        <p className="text-blue-950/90 font-serif text-sm  line-clamp-3">
          {parse(content)}
        </p>
      </div>
    </Link>
  );
}

export default PostCard;
