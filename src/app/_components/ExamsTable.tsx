'use client'

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon  from "@mui/icons-material/StarBorder"
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Exam } from "@/types/exam";
import { createCalendar } from '../(api)/actions';

interface ExamsTableProps {
    displayedExams: Exam[];
    nameFilter: string
    showTracked: boolean
}



export default function ExamsTable({displayedExams, nameFilter, showTracked}: ExamsTableProps) { 
    const downloadCalendar = async () => {
        var exams = rows.filter(e => e?.Tracked);
        var calendarData = await createCalendar(exams);
        const blob = new Blob([calendarData], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'finals_schedule.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const is_tracked = (term:string) => {
        return localStorage.getItem(term) != null;    
    }

    const examToRow = (exams:typeof displayedExams) => {
        return exams.map((exam)=>{
            const combinedCourseCode = exam.course_code?.replace(' ', '').toLowerCase();
            const combinedCourseName = exam.course_name.replace(' ','').toLowerCase();
            if(nameFilter != '' 
                && !combinedCourseName.includes(nameFilter) 
                && !combinedCourseCode?.includes(nameFilter)){
                return;
            }
            return ({
                id: exam.id,
                Code: exam.course_code,
                Section: exam.section,
                Name: exam.course_name,
                'Start Time': exam.exam_start,
                'End Time': exam.exam_end,
                'Exam Type': exam.exam_type,
                Building: exam.building,
                Room: exam.room,
                Rows: exam.rows,
                Tracked: is_tracked(exam.course_code + exam.section)
            })
        })
    }
    
    const [rows, setRows] = useState(examToRow(displayedExams));
    useEffect(()=>{
        if(showTracked){
            setRows(examToRow(displayedExams).filter(row => row !== undefined && is_tracked(row.Code+row.Section)))
        }else{
            setRows(examToRow(displayedExams).filter(row => row !== undefined))
        }
    },[displayedExams, nameFilter, showTracked])

    const handleToggleTracked = (term:string) => {
        setRows((prevRows)=>
                    prevRows.filter(row => row !== undefined).map((row) =>{
                        if(row.Code+row.Section == term){
                            if(row!.Tracked){
                                localStorage.removeItem(term);
                            }else{
                                localStorage.setItem(term, "Tracked");
                            }
                        return {...row, Tracked: !row!.Tracked};
                    }
                    return row;
                    }))
    }
    
    if (displayedExams.length == 0) {
        return (
            <div className="justify-self-stretch text-center text-black font-serif">
                Loading exams...
            </div>        
            )
        }
        
        if(rows.length == 0){
            return (
                <div className="justify-self-stretch text-center text-black font-serif">
                No exams found matching the filter.
            </div>
        )
    }
    
    const keys = ['Code',"Section", 'Name', 'Start Time', 'End Time', 'Exam Type', 'Building', 'Room', 'Rows'];
    return (
        <>
        <Box sx={{ zIndex:1, boxShadow:"5", scrollbarColor:"",justifySelf:"center" ,maxHeight: 700, width: '100%', overflowY: 'auto', position: 'relative', borderRadius:2}}>
            <table className="w-full shadow-2xl">
            <thead style={{position:'sticky'}}>
                <tr>
                {keys.map((col,idx) => <th key={idx} style={{background: "#293039"}} className="h-14 px-5 sticky top-0">{col}</th>)}
                <th style={{background: "#293039"}} className="h-14 px-5 sticky top-0">Tracking</th>
                </tr>
            </thead>
            <tbody>
                {rows.filter(row => row !== undefined).map((row: { [key: string]: any }, idx) => (
                <tr style={idx%2==0 ? { background:'#7f0a27'  } : {background: "#7e394a"}}className={"h-16 items-center justify-center text-center "} key={idx}>
                    {keys.map((key)=>{
                        if((key === 'Start Time' || key === 'End Time')){
                            const date = new Date(row[key]);                            
                            const options = {
                                timeZone: 'America/New_York',
                                weekday: 'long' as 'long',
                                year: 'numeric' as 'numeric',
                                month: 'long' as 'long',
                                day: 'numeric' as 'numeric',
                              };
                            return (
                                <td key={key}>
                                    {date.toLocaleTimeString('en-US', options)}
                                </td>
                            )
                        }
                        return (
                        <td key={key}>
                            {row[key]?.toString() || ' '}
                        </td>)
                    })}
                    <td>

                    {row.Code != null && is_tracked(row.Code+row.Section)
                        ? <StarIcon style={{color:"yellow"}}  onClick={() => handleToggleTracked(row.Code+row.Section)} />
                        : <StarBorderIcon onClick={() => handleToggleTracked(row.Code+row.Section)} />
                    }
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </Box>
    </>

    )
}