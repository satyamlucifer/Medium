import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./Avatar"
import TextWithBreaks from "./TextWithBreaks"

export function BlogView({ blog }: { blog: Blog }) {
    return <div>
        <Appbar name={"S"}></Appbar>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-2xl">
                <div className="col-span-8">
                    <div className="text-3xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-400 pt-2">
                        Post on 2nd Feburary 2024
                    </div>
                    <div className="pl-2 py-4 bg-slate-100">
                        <TextWithBreaks text={blog.content}></TextWithBreaks>
                    </div>
                </div>
                <div className="col-span-4 pl-4">
                    <div className=" text-lg text-slate-500">Author</div>
                    
                    <div className="flex">
                        <div className="flex flex-col justify-center pr-4">
                        <Avatar name={blog.author.name || "A"} size="big"></Avatar>
                        </div>
                        <div>
                            <div className="text-xl font-bold flex-col">
                                {blog.author.name || "Anonymus"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Author is an amazing shinobi and a great brother of the hidden leaf.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}