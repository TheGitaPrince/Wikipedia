import React, {useEffect, useState} from 'react'
import AddPost from "./AddPost.jsx"
import service from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
  const [post,setPosts] = useState(null)
  const navigate = useNavigate()
  const {slug} = useParams()

  useEffect(() => {
        if(slug){
            service.getPost(slug).then((post)=>{
               if(post){
                  setPosts(post)
               }
            })
        }else{
          navigate("/")
        }
  },[slug, navigate])
  
     return post? (
       <div>
          <AddPost post={post} />
       </div>
     ):null;
}

export default EditPost