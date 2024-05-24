import { useParams } from "react-router-dom";
import { BlogView } from "../components/BlogView";
import { useBlog } from "../hooks";
import { BlogsSkeleton } from "../components/BlogsSkeleton";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });
    if (loading || !blog) {
        return <div>
            <Appbar name={""}></Appbar>
            <div className="pt-10 pl-40">
                <BlogsSkeleton />
            </div>
            <div className="pl-40">
                <BlogsSkeleton />
            </div>
            <div className="pl-40">
                <BlogsSkeleton />
            </div>
            <div className="pl-40">
                <BlogsSkeleton />
            </div>
            <div className="pl-40">
                <BlogsSkeleton />
            </div>
        </div>
    }

    return <div>
        <BlogView blog={blog}></BlogView>
    </div>
}