'use server'

import { findAllExams, findExamBySearchTerm, findUserFavoritedExam,  } from "@/repository/examRepository";
import { accountExists, createAccount, login, logout } from "@/repository/userRepository";
import ical from "ical-generator";

export async function getExamsBySearchTerm(searchTerm: string) {
    const res =  await findExamBySearchTerm(searchTerm);
    return res;
}

export async function getAllExams(){
    const res = await findAllExams();
    console.log(res);
    return res;
}

export async function getUserFavoriteExams(userId:number){
    return await findUserFavoritedExam(userId);
}

export async function attemptCreateAccount(username:string, email:string, password:string){
    if(password.length < 8){
        return {"error":"Password too short"}
    }

    var exists = await accountExists(username, email);
    if(exists){
        return {"error":"Account with email or username already exists"}
    }

    const res = await createAccount(username, email, password);
    return res;
}

export async function attemptLogin(identifier:string, password:string){
    const res = await login(identifier, password);

}

export async function createCalendar(exams: any[]){
    var calendar = ical({"name":"Final Exams Schedule"});
    exams.forEach(exam => {
        var summary:string = exam.Code + " Final"
        var description:string = exam.Name + " Final Exam"
        var start:Date = exam['Start Time'];
        var end:Date = exam['End Time'];
        var location = exam.Building + exam.Room + exam.Rows;
        var date_options = {
            timeZone: 'America/New_York',
            weekday: 'long' as 'long',
            year: 'numeric' as 'numeric',
            month: 'long' as 'long',
            day: 'numeric' as 'numeric',
        };
        
        if(start.getDate() != end.getDate()){
            calendar.createEvent({
                summary: summary + " Opens",
                description: description + " is available\nDue date is on "+end.toLocaleString('en-US',date_options),
                start: start,
                end: new Date(start.getTime() + 60 * 60000),
                priority: 2
            })
            calendar.createEvent({
                summary: summary + " is due in 1 hour",
                description: description + " is due soon at "+end.toLocaleTimeString('en-US',date_options),
                start: new Date(end.getTime() - 60*60000),
                end: end,
                priority: 2
            })
        }else{
            calendar.createEvent({
                summary: summary,
                description: description,
                start: start,
                end: end,
                location: location,
                priority: 2
            })
        }
    })
    console.log(calendar.toString());
    return calendar.toString();
}