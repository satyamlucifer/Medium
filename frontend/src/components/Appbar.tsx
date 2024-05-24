import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { Logout } from "./Logout";

interface AppbarData {
    name: String
}
export function Appbar({ name }: AppbarData) {
    return <div className="border-b flex justify-between px-10 py-4">
        <div className="flex justify-center flex-col">
            <Link to="/blogs">
                <div className="flex flex-col justify-center text-xl font-semibold cursor-pointer">
                    Medium
                </div>
            </Link>
        </div>
        <div className="flex">
            <div>
                <Link to={"/publish"}>
                    <button type="button" className="text-white mr-4 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
                </Link>
            </div>
            <div className="pr-4">
                <Avatar name={name} size={"big"}></Avatar>
            </div>
            <div className="cursor-pointer">
            <Link to={"/signin"}>
            <Logout onClick={()=>{
                localStorage.clear()
            }}></Logout>
            </Link>
            </div>

        </div>
    </div>
}