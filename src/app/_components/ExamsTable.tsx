'use client'

import LaunchIcon from '@mui/icons-material/Launch';
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Exam } from "@/types/exam";
import { DisplayedExam } from '@/types/displayedExam';
import { createCalendar } from '../(api)/actions';
import ExamModal from './ExamModal';
import StarButton from './StarButton';
import DownloadButton from './DownloadButton';


interface ExamsTableProps {
    displayedExams: Exam[];
    nameFilter: string
    showTracked: boolean
}

export default function ExamsTable({displayedExams, nameFilter, showTracked}: ExamsTableProps) { 
    const [open, setOpen] = useState(false);
    const handleModalClose = () => setOpen(false);
    const handleModalOpen = (exam:any) => {setSelectedExam(exam);setOpen(true)};
    const [selectedExam, setSelectedExam] = useState<any | null>(null); 


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
    
    const examToDisplayedExam = (exams: typeof displayedExams): DisplayedExam[] => {
        return exams.map((exam) => {
            const combinedCourseCode = exam.course_code.replace(' ', '').toLowerCase();
            const combinedCourseName = exam.course_name.replace(' ', '').toLowerCase();
            if (nameFilter != ''
                && !combinedCourseName.includes(nameFilter)
                && !combinedCourseCode?.includes(nameFilter)) {
                return null;
            }
            return {
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
            } as DisplayedExam;
        }).filter(exam => exam !== null) as DisplayedExam[];
    }


    const [rows, setRows] = useState(examToDisplayedExam(displayedExams));
    useEffect(()=>{
        if(showTracked){
            setRows(examToDisplayedExam(displayedExams).filter(row => row !== undefined && is_tracked(row.Code+row.Section)))
        }else{
            setRows(examToDisplayedExam(displayedExams).filter(row => row !== undefined))
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
        <Box sx={{boxShadow:"5", scrollbarColor:"",justifySelf:"center" ,maxHeight: 700, width: '100%', overflowY: 'auto', position: 'relative', borderRadius:2}}>
            <table className="w-full shadow-2xl">
            <thead style={{position:'sticky', zIndex:99}}>
                <tr>
                {keys.map((col,idx) => <th key={idx} style={{background: "#293039"}} className="h-14 px-5 sticky top-0">{col}</th>)}
                <th style={{background: "#293039", zIndex:99}} className="h-14 px-5 sticky top-0">Tracking</th>
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
                                hour: "2-digit" as '2-digit',
                                minute: "2-digit" as '2-digit'
                            };
                            return (
                                <td key={key} className='py-2'>
                                    {date.toLocaleTimeString('en-US', options)}
                                </td>
                            )
                        }else if(key === "Code"){
                            return (
                                <td className='justify-self-center hover:cursor-pointer whitespace-nowrap '
                                key={key} onClick={()=>handleModalOpen(row)}>
                                    {row[key]?.toString() || ''}
                                    <LaunchIcon sx={{width:"15px", marginLeft:"3px"}} fontSize='small'/>
                                </td>
                            )
                        }
                        return (
                        <td key={key} className='py-2'>
                            {row[key]?.toString() || ' '}
                        </td>)
                    })}
                    <td>
                    <StarButton id={row.Code+row.Section} handleToggleTrack={handleToggleTracked} isTracked={is_tracked}/>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </Box>
        <div className='justify-self-end text-center font-serif rounded-md'>
            <DownloadButton onDownload={downloadCalendar}/>
        </div>
        <ExamModal handleToggleTrack={handleToggleTracked} exam={selectedExam} open={open} handleClose={handleModalClose} />
    </>

    )
}