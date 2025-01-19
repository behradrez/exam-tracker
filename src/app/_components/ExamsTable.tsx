'use client'

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon  from "@mui/icons-material/StarBorder"
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Exam } from "@/types/exam";




interface ExamsTableProps {
    displayedExams: Exam[];
    nameFilter: string
    showTracked: boolean
}

export default function ExamsTable({displayedExams, nameFilter, showTracked}: ExamsTableProps) { 

    const is_tracked = (id:bigint) => {
        return localStorage.getItem(id.toString()) != null;
    }

    const examToRow = (exams:typeof displayedExams) => {
        return exams.map((exam, index)=>{
            const combinedCourseCode = exam.course_code?.replace(' ', '').toLowerCase();
            if(nameFilter != '' 
                && !exam.course_name?.toLowerCase().includes(nameFilter) 
                && !combinedCourseCode?.includes(nameFilter)){
                return;
            }
            return ({
                id: exam.id,
                Code: exam.course_code,
                Name: exam.course_name,
                'Start Time': exam.exam_start,
                'End Time': exam.exam_end,
                'Exam Type': exam.exam_type,
                Building: exam.building,
                Room: exam.room,
                Rows: exam.rows,
                Tracked: is_tracked(exam.id)
            })
        })
    }
    
    const [rows, setRows] = useState(examToRow(displayedExams));
    useEffect(()=>{
        if(showTracked){
            setRows(examToRow(displayedExams).filter(row => row !== undefined && is_tracked(row.id)))
        }else{
            setRows(examToRow(displayedExams).filter(row => row !== undefined))
        }
    },[displayedExams, nameFilter, showTracked])

    const handleToggleTracked = (id:bigint) => {
        setRows((prevRows)=>
                    prevRows.filter(row => row !== undefined).map((row) =>{
                        if(row.id === id){
                            if(row!.Tracked){
                                localStorage.removeItem(row.id.toString());
                            }else{
                                localStorage.setItem(row.id.toString(), "Tracked");
                            }
                        return {...row, Tracked: !row!.Tracked};
                    }
                    return row;
                    }))
    }

    
    const keys = ['Code', 'Name', 'Start Time', 'End Time', 'Exam Type', 'Building', 'Room', 'Rows'];
    if(rows.length == 0){
        return (
            <div className="justify-self-center">
                No exams found matching the filter.
            </div>
        )
    }
    return (
        
        <Box sx={{ scrollbarColor:"",justifySelf:"center" ,maxHeight: 700, maxWidth: '100%', overflowY: 'auto', position: 'relative', borderRadius:2}}>
            <table className="w-fit">
            <thead style={{position:'sticky'}}>
                <tr>
                {keys.map((col,idx) => <th key={idx} className="bg-lime-600 px-5 sticky top-0">{col}</th>)}
                <th className="bg-lime-600 px-5 sticky top-0">Tracking</th>
                </tr>
            </thead>
            <tbody>
                {rows.filter(row => row !== undefined).map((row: { [key: string]: any }, idx) => (
                <tr className={"h-16 items-center justify-center text-center "+(idx % 2 === 0 ? "bg-cyan-900" : "bg-cyan-700")} key={idx}>
                    {keys.map((key)=>{
                        if(key === 'Start Time' || key === 'End Time'){
                            return (
                                <td key={key}>
                                    {(row[key]?.toString().slice(0, -32) || '')}
                                </td>
                            )
                        }
                        return (
                        <td key={key}>
                            {row[key]?.toString() || ' '}
                        </td>)
                    })}
                    <td>

                    {row.Code != null && is_tracked(row.id)
                        ? <StarIcon style={{color:"yellow"}}  onClick={() => handleToggleTracked(row.id)} />
                        : <StarBorderIcon onClick={() => handleToggleTracked(row.id)} />
                    }
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

        </Box>
    )
}