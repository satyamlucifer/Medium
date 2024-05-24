import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogsSkeleton } from "../components/BlogsSkeleton";
import { useBlogs } from "../hooks"


export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return <div>
            <div>
                <Appbar name={"S"}></Appbar>
            </div>
            <div>
                <div className="flex justify-center mt-10">
                    <BlogsSkeleton></BlogsSkeleton>
                </div>
                <div className="flex justify-center mt-10">
                    <BlogsSkeleton></BlogsSkeleton>
                </div>
                <div className="flex justify-center mt-10">
                    <BlogsSkeleton></BlogsSkeleton>
                </div>
                <div className="flex justify-center mt-10">
                    <BlogsSkeleton></BlogsSkeleton>
                </div>
                <div className="flex justify-center mt-10">
                    <BlogsSkeleton></BlogsSkeleton>
                </div>
            </div>
        </div>
    }


    return <div>
        <div>
            <Appbar name={"S"}></Appbar>
        </div>
        <div className="flex justify-center">
            <div className="">
                {blogs.map((blog) =>
                    <BlogCard id={blog.id} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} date="May 23, 2024"></BlogCard>
                )}
            </div>
        </div>
    </div>
}