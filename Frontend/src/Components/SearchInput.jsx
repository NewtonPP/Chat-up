import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../zustand/useConversation";
import useGetConversations from "../Hooks/useGetConversation"
import toast from "react-hot-toast"
const SearchInput=()=>{

    const [search, setSearch] = useState("");
    const {setSelectedConversation} = useConversation();
    const {conversations} =useGetConversations();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!search) return;
        if(search.length<3){
            return toast.error("Search term must be at least 3 characrters long")
        }

        const conversation = conversations.find((c)=>c.FullName.toLowerCase().includes(search.toLowerCase()))

        if(conversation){
            setSelectedConversation(conversation)
            setSearch("")
        }else{
            toast.error("No Such User Found!!")
        }
    }

    return(

        <form onSubmit={handleSubmit}className="flex items-center gap-2">
            <input type ="text" placeholder="Search..." className="input input-bordered rounded-full"
            value = {search}
            onChange={(e)=>setSearch(e.target.value)}/>
            <button type = "submit" className="btn btn-circle bg-sky-500 text-white">
            <FaSearch />
            </button>
        </form>
    )
}
export default SearchInput;