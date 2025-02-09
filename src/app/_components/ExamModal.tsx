'use client'

import Modal from '@mui/material/Modal';
import { DisplayedExam } from '@/types/displayedExam';
import { useEffect, useState } from 'react';
import Fade from '@mui/material/Fade';
import LaunchIcon from '@mui/icons-material/Launch';
import TrackButton from './TrackExamButton';

interface ExamModalProps {
    exam: DisplayedExam | null
    open: boolean
    handleClose: ()=>void
    handleToggleTrack: (term:string)=>void
}

export default function ExamModal({exam, open, handleClose, handleToggleTrack}: ExamModalProps) {
    const [examTracked, setExamTracked] = useState(exam?.Tracked ?? false);

    useEffect(()=>{
        setExamTracked(exam?.Tracked || false);
    },[exam])

    const getCourseLink = (inputExam: DisplayedExam) => {
        const examStart = inputExam['Start Time'] ?? new Date();
        var yearParam = examStart.getFullYear().toString() + '/' + (examStart.getFullYear()+1).toString();
        if (examStart.getUTCMonth() != 12){
            yearParam = (examStart.getFullYear()-1).toString() + '-' + examStart.getFullYear().toString();
        }
        var codeParam = exam!.Code.replace(' ','-');
        return 'https://mcgill.ca/study/'+yearParam+'/courses/'+codeParam;
    }

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
        <>
        <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='justify-center rounded-lg flex flex-col m-auto justify-self-center w-8/12 md:w-7/12 h-4/5 md:h-1/3'
        >
            <Fade in={open}>
            <div
            style={(Number(exam?.id) % 2 === 0 ? { background:'#7f0a27' } : { background: "#7e394a" })}
            className='w-full mt-8 md:mt-0 py-4 rounded-lg'
            >
            
            {exam == null 
            ? <div>Invalid Exam selected</div>
            :<div className='px-6 text-lg -indent-4'>
                <div className='text-center'>
                    <div className='text-xl font-bold mt-2 underline underline-offset-4'>
                        {exam.Code}: {exam.Name}
                    </div>
                </div>

                <div className='mt-5'>
                    Section {exam.Section}
                </div>
                <div className='mb-5'>
                Exam Type: <span className='text-md'>{exam['Exam Type']?.toLocaleLowerCase()}</span>
                </div>
                <div className=''>
                    Starts on {exam['Start Time']?.toLocaleString('en-US', options)}
                </div>
                <div className='mb-5'>
                    Ends on {exam['End Time']?.toLocaleString("en-US",options)}
                </div>
                <div className='pb-2 text-xl font-semibold underline underline-offset-2'>
                    Exam Location
                </div>
                <div >
                    Building: {exam.Building === null ? 'Unavailable' : exam.Building}
                </div>
                <div>
                    Room: {exam.Room === null ? 'Unavailable' : exam.Room}
                </div>
                <div>
                    Rows: {exam.Rows === null ? 'Unavailable' : exam.Rows} {exam.RowStart != null && exam.RowEnd != null && 'from '+exam.RowStart+' to '+exam.RowEnd}
                </div>
                <div className='underline underline-offset-2 my-5'>
                    <a href={getCourseLink(exam)}>
                        View Course Information
                    <LaunchIcon />
                    </a>
                </div>
                <div className='justify-self-end px-4 indent-0 rounded-lg'>
                    <TrackButton id={exam.Code+exam.Section} isTracked={examTracked} handleToggleTrack={()=>{setExamTracked(!examTracked);handleToggleTrack(exam.Code+exam.Section)}}/>
                </div>
            </div> 
            }
            </div>
            </Fade>
        </Modal>
        </>
    )
}
