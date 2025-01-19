'use client'

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ExamsTable from "./ExamsTable";
import { getAllExams } from "../(api)/actions";
import { Exam } from "@/types/exam";

export default function SearchableTable() {
    const [nameFilter, setNameFilter] = useState('')
    const [displayedExams, setDisplayedExams] = useState<Exam[]>([]);
    const [showTracked, setShowTracked] = useState(false);


    useEffect(()=>{
        async function fetchExams() {
            const exams = await getAllExams();
            setDisplayedExams(exams);
        }
        fetchExams();
    },[]);

    const toggleShowTracked = () => {
        setShowTracked(!showTracked);
    }

    return (
        <div style={{maxWidth:'90%', justifySelf:"center"}}>
            <SearchBar setNameFilter={setNameFilter} toggleTracked={toggleShowTracked}/>
            <ExamsTable displayedExams={displayedExams} nameFilter={nameFilter} showTracked={showTracked}/>
        </div>
    )
}