'use client'

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon  from "@mui/icons-material/StarBorder"
import { useEffect, useState } from "react";
import { Box } from "@mui/material";



export type Exam = {
    id: bigint;
    created_at: Date;
    exam_start: Date | null;
    exam_end: Date | null;
    course_code: string | null;
    course_name: string | null;
    exam_type: string | null;
    building: string | null;
    room: string | null;
    rows: string | null;
};

interface ExamsTableProps {
    displayedExams: Exam[];
    nameFilter: string
}

export default function ExamsTable({displayedExams, nameFilter}: ExamsTableProps) { 
    
    const examToRow = (exams:typeof displayedExams) => {
        return exams.map((exam, index)=>{
            if(nameFilter != '' && !exam.course_name?.includes(nameFilter) && !exam.course_code?.includes(nameFilter)){
                return;
            }
            return ({
                id: index,
                Code: exam.course_code,
                Name: exam.course_name,
                'Start Time': exam.exam_start,
                'End Time': exam.exam_end,
                'Exam Type': exam.exam_type,
                Building: exam.building,
                Room: exam.room,
                Rows: exam.rows,
                Tracked: exam.course_code != null && localStorage.getItem(exam.course_code) != null
            })
        })
    }
    
    const [rows, setRows] = useState(examToRow(displayedExams));
    useEffect(()=>{
        setRows(examToRow(displayedExams).filter(row => row !== undefined))
    },[displayedExams, nameFilter])

    const handleToggleTracked = (course_code:string) => {
        setRows((prevRows)=>
                    prevRows.filter(row => row !== undefined).map((row) =>{
                    if(row!.Code === course_code){
                        if(row!.Tracked){
                            localStorage.removeItem(row!.Code!);
                        }else{
                            localStorage.setItem(row!.Code!, "Tracked");
                        }
                        return {...row, Tracked: !row!.Tracked};
                    }
                    return row;
                    }))
    }

    
    const keys = ['Code', 'Name', 'Start Time', 'End Time', 'Exam Type', 'Building', 'Room', 'Rows'];
    return (
        <Box sx={{ maxHeight: 200, overflowY: 'auto', position: 'relative' }}>
            <table style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}></table>
            <table >
            <thead style={{position:'sticky'}}>
                <tr>
                {keys.map((col,idx) => <th key={idx} className="bg-lime-600 px-5 sticky top-0">{col}</th>)}
                <th className="bg-lime-600 px-5 sticky top-0">Tracked</th>
                </tr>
            </thead>
            <tbody>
                {rows.filter(row => row !== undefined).map((row: { [key: string]: any }, idx) => (
                <tr className={"h-16 items-center justify-center text-center "+(idx % 2 === 0 ? "bg-amber-700" : "bg-amber-500")} key={row.Code}>
                    {keys.map((key)=>{
                        
                        return (
                        <td key={key}>
                            {row[key]?.toString()}
                        </td>)
                    })}
                    <td>
                    {row.Code != null && localStorage.getItem(row.Code) != null
                        ? <StarIcon onClick={() => handleToggleTracked(row.Code || '')} />
                        : <StarBorderIcon onClick={() => handleToggleTracked(row.Code || '')} />
                    }
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </Box>
    )
}