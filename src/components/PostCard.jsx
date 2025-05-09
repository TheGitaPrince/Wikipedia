import React from 'react'
import  service from "../appwrite/config.js";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function PostCard({
    $id,
    title,
    content,
    featuredImage
}){

  const imageUrl = featuredImage ? service.getFileView(featuredImage) : "";

  const url = `/post/${$id}`

  return (
    <Link to = {url}>
        <div className="bg-white h-72 w-80 shadow flex flex-col gap-2 p-2 rounded">
           <h2 className="text-xl font-medium text-gray-800 ">{ title }</h2>
           <div className="h-48 w-72 rounded mx-auto bg-gray-100">
              <img 
              className="w-full h-full object-contain rounded"
              src={ imageUrl } alt={title} />
           </div>
           <p className="text-sm text-gray-600 line-clamp-3">{ parse( content )} </p>
        </div>
    </Link>
  )
}

export default PostCard