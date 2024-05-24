import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps{
    id:string;
    authorName:string;
    title:string;
    content:string;
    date:string
}
export const BlogCard = ({id,authorName,title,content,date}:BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    <div className="border-b p-4 border-slate-200 pb-2 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <div className="pr-2 flex justify-center flex-col">
                    {/* ${authorName.split(" ")[1].slice(0,1) */}
                    <Avatar name={authorName} size={"small"}></Avatar>
                </div>
            <div className="flex justify-center flex-col font-extralight pr-2">
                {authorName}
            </div>
            <div className="flex justify-center flex-col pr-2">
            <Circle></Circle>
            </div>
            <div className="flex justify-center flex-col font-thin text-sm text-slate-500">
            {date}
            </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin pt-3">
                {content.slice(0,100) + "..."}
            </div>
            <div className="text-slate-400 font-thin">
                {`${Math.ceil(content.length/100)} minutes to read`}
            </div>
        </div>
        </Link>
    }

    function Circle(){
        return <div className="w-1 h-1 rounded-full bg-slate-400">

        </div>
    }