import { ChangeEvent } from "react";
import { getAllExams } from "../(api)/actions";

interface SearchBarProps {
    setNameFilter: Function
}

export default function SearchBar({setNameFilter} : SearchBarProps) {
    const handleFilterChange = (e: ChangeEvent) => {
        console.log(e);
        setNameFilter(e);
    }

    return (
        <>
        <div>
            <input type="text" className="text-black" onChange={(e)=>setNameFilter(e.target.value)} />
        </div>
        </>
    )
}