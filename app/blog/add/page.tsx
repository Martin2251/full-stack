"use client"

import { Toaster } from "react-hot-toast"

const AddBlog = () => {
  return (
    <>
   <Toaster  />
   <div className="w-full m-auto flex my-4">
    <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-200 font-bold p-3"> Add a blog</p>
        <form>
          
            <input type='text' name='title' placeholder='Title' className='rounded-md px-4 py-2 my-2 w-full'  />
            <textarea className="rounded-md px-4 w-full my-2" placeholder="desc"></textarea>
            
        </form>
    </div>
   </div>
    </>
  )
}

export default AddBlog

