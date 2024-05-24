interface AvatarData {
    name:String;
    size?: "small" | "big"
}
export function Avatar({name,size = "small"}: AvatarData){
    return <div className={`relative inline-flex items-center justify-center w-${size==="big"?10:6} h-${size==="big"?10:6} overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600`}>
    <span className={`text-${size==="big"?"xl":"sm"} text-gray-600 dark:text-gray-300`}>{name.slice(0,1)}</span>
</div>
}