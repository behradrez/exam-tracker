interface SearchBarProps {
    setNameFilter: Function
    toggleTracked: Function
}

export default function SearchBar({setNameFilter, toggleTracked} : SearchBarProps) {
    const handleFilterChange = (filter:string) => {
        setNameFilter(filter.replace(' ','').toLowerCase());
    }
    
    return (
        <div className="justify-self-center mb-2 flex flex-row">
            <input 
            type="text"
            placeholder="Start by typing an exam course code/name" 
            className="text-black w-96 rounded-xl text-center italic text-xs md:text-lg" 
            onChange={(e)=>handleFilterChange(e.target.value)} />
            <input
            id='favorites'
            type="checkbox"
            className="w-7 h-7 ml-4"
            onChange={(e)=>toggleTracked()}/>
            <label 
            htmlFor="favorites"
            className="ml-1 md:mr-2 pt-0.5 text-black font-serif font-medium text-xs sm:text-base">
                Show Tracked Only
            </label>

        </div>
    )
}