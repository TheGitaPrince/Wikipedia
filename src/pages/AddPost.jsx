import React,{ useCallback, useEffect, useState } from 'react';
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import RTE from "../components/RTE.jsx";
import Select from "../components/Select.jsx";
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/config.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import Loading from "../components/Loading.jsx";

function AddPost({ post }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const userData = useSelector((state) => state.auth.userData );
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    
    const userId = userData?.$id
    
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
    
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if (file) {
          setSelectedImage(URL.createObjectURL(file));
          setValue("image", [file], { shouldValidate: true })
        }
    }

    const submit = async (data) => {
        setLoading(true);
        try {
            if (post) {
                const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;
    
                if (file && post.featuredImage){ appwriteService.deleteFile(post.featuredImage) }
    
                const updatedPost = await appwriteService.updatePost(
                    post.$id, 
                    { ...data, featuredImage: file ? file.$id : undefined }
                );
    
                if (updatedPost) { navigate(`/post/${updatedPost.$id}`) }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);
    
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
    
                    const newPost = await appwriteService.createPost(
                        { ...data, userId: userId })

                    if (newPost) { navigate(`/post/${newPost.$id}`) }
                }
            } 
        } catch (error) {
            console.error("Post submit error:", error);
        }finally {
            setLoading(false);
        }
    };

    const imageUrl = post?.featuredImage ? appwriteService.getFileView(post?.featuredImage) : "";

    return (
      <section className="max-w-2xl mx-auto bg-white p-8">
          <form onSubmit={handleSubmit(submit)} className="flex flex-col">
              <div className="flex flex-col w-full">
                    <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                    />
                    <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    />
                   <Select
                    options={["active", "inactive"]}
                    label="Status: "
                    className="mb-4"
                    {...register("status", { required: true })}
                   />
                   <label htmlFor="" className="pb-1">image:</label>
                   <label  className="cursor-pointer px-3 py-4 flex items-center justify-center  text-neutral-800 mb-2 rounded-lg border shadow-lg border-neutral-700 w-full">
                      <MdCloudUpload className="size-8"/>
                     <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                   />
                  </label>
                  { (selectedImage || imageUrl) && (
                      <div className="h-40 w-48 mt-4">
                        <img 
                        className="h-full w-full object-contain"
                        src={ selectedImage || imageUrl } alt="image" />
                      </div>
                    )
                  }
             </div>
                <RTE  
                 label="Content :" 
                 name="content" 
                 control={control} 
                 defaultValue={getValues("content")}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full flex justify-center">
                  {loading? <Loading/> :  post ? "Update" : "Submit"}
                </Button>
        </form>
      </section>
    );
}

export default AddPost;