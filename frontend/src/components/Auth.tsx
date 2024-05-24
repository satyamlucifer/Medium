import { SignupType } from "@satyamdeveloper/medium-common";
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupType>({
        email: "",
        password: "",
        name: ""
    });

    async function sendRequest(){
       try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"? "signup" : "signin"}`,postInputs)
        const jwt = response.data.token
        localStorage.setItem("token",jwt)
        navigate("/blogs")
        }
        catch(e)
        {
            return
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center ">
            <div>
                <div className="text-3xl font-extrabold pl-12 pr-12">
                    {type==="signin" ? "Sign in to account" : "Create an account"}
                </div>
                <div className="text-slate-500 pt-2 pl-12 pr-12">
                {type==="signin" ? "Don't have an account?" : "Already have an account?"}
                    
                    <Link className="pl-2 underline" to={type==="signin" ? "/signup" :"/signin"}>{type==="signin" ? "Sign up" : "Sign in"}</Link>
                </div>
                {type==="signup" ? <LabelledInput label="Userame" placeholder="Enter Username" onChange={(e) => {
                    setPostInputs(c => ({
                        ...c,
                        name: e.target.value
                    }))
                }} /> : null}
                <LabelledInput label="Email" placeholder="Enter Email" onChange={(e) => {
                    setPostInputs(c => ({
                        ...c,
                        email: e.target.value
                    }))
                }} />
                <LabelledInput label="Password" type="password" placeholder="Enter Password" onChange={(e) => {
                    setPostInputs(c => ({
                        ...c,
                        password: e.target.value
                    }))
                }} />
                <Button sendRequest = {sendRequest} name={type==="signin" ? "Sign in" : "Sign up"}></Button>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}
interface ButtonProps {
    name: string;
    sendRequest: () => void
  }

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div className="pt-4">
        <div>
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>

}
function Button({name, sendRequest}: ButtonProps) {
    return <div className="mt-8">
        <div>
            <button onClick = {sendRequest}type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:w-full dark:border-gray-700">{name}</button>
        </div>
    </div>

}