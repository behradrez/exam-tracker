'use client'

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ExamsTable from "./ExamsTable";
import { getAllExams } from "../(api)/actions";
import { Exam } from "@/types/exam";

export default function SearchableTable() {
    const [nameFilter, setNameFilter] = useState('')
    const [displayedExams, setDisplayedExams] = useState<Exam[]>([]);

    useEffect(()=>{
        async function fetchExams() {
            const exams = await getAllExams();
            setDisplayedExams(exams);
        }
        fetchExams();
    },[]);

    return (
        <>
        <SearchBar setNameFilter={setNameFilter}/>
        <ExamsTable displayedExams={displayedExams} nameFilter={nameFilter}/>
        </>
    )
}