import Image from "next/image";


async function fetchBlogs(){
  const res = await fetch("http://localhost:3001/api/blog",{next:{
    revalidate:10,
  },

});
const data = await res.json()
return data.posts;
}

export default async function Home() {
  const posts = await fetchBlogs();
  console.log(posts)
  return (
 <main className ="w-full h-full">
<div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg bg-slate-800 drop-shadow-xl">
  <h1 className="text-slate-200 text-center text-2xl font-extrabold font-[verdana]">Full Stack Blog </h1>
</div>
 </main>
  );
}
