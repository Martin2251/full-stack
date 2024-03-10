"use client"

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Toaster,toast } from "react-hot-toast"

type UpdateBlogParams ={
    title:string;
    description:string;
    id:string;
}

const updateBlog = async (data:UpdateBlogParams) =>{

    const res = fetch(`http://localhost:3001/api/blog/${data.id}`,
    {method:"PUT", body:JSON.stringify({title:data.title,description:data.description}),
    //@ts-ignore
    "Content-Type": "application/json"
});
    return (await res).json();
}

const deleteBlog = async (id:string) =>{

    const res = fetch(`http://localhost:3001/api/blog/${id}`,{
    method:"DELETE",
    //@ts-ignore
    "Content-Type": "application/json"
});
    return (await res).json();
}

const getBlogById = async (id:string) => {
    const res = await fetch(`http://localhost:3001/api/blog/${id}`);
    const data = await res.json();
    return data.post;
}


const EditBlog = ({params}:{params:{id:string}}) => {
    const router = useRouter()
    console.log(params.id)
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() =>{
        toast.loading("Fetching blog details", {id:"1"});
        getBlogById(params.id)
        .then((data) => {
            if(titleRef.current && descriptionRef.current){
                titleRef.current.value = data.title
                descriptionRef.current.value = data.description
                toast.success("Fetching Complete", {id:"1"})
            }
         
        }).catch(err =>{
            console.log(err)
            toast.error("Error Fetching",{id:"1"})
            
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handleSubmit = async(e:any) =>{
        e.preventDefault();
        if(titleRef.current && descriptionRef.current){
            toast.loading("sending request", {id:"1"})
            await updateBlog({title:titleRef.current?.value, description:descriptionRef.current?.value, id:params.id});
            toast.success("Blog Posted Successfully", {id:"1"})
            router.push("/")
        }
        
    };

    const handleDelete = async () =>{
        toast.loading("Deleting Blog...", {id:"2"})
        await deleteBlog(params.id);
        toast.success("Blog deleted",{id:"2"})
        router.push("/")
    }
  return (
    <>
   <Toaster  />
   <div className="w-full m-auto flex my-4">
    <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-200 font-bold p-3"> Edit a blog</p>
        <form onSubmit={handleSubmit}>
          
            <input type='text' ref={titleRef} name='title' placeholder='Title' className='rounded-md px-4 py-2 my-2 w-full'  />
            <textarea ref={descriptionRef} className="rounded-md px-4 w-full my-2" placeholder="desc"></textarea>
            <div className="flex">
            <button className="font-semibold px-4 py-2 shadow-xl my-2 bg-slate-200 rounded-lg m-auto hover:bg-slate-100">Update</button>
        
            </div>
           
        </form>
        <button onClick={handleDelete} className="font-semibold px-4 py-2 shadow-xl bg-red-300 rounded-lg m-auto mt-2 hover:bg-red-500 my-2">Delete</button>
    </div>
   </div>
    </>
  )
}

export default EditBlog

