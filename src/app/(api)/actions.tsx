'use server'

import { findAllExams, findExamBySearchTerm, findUserFavoritedExam,  } from "@/repository/examRepository";
import { accountExists, createAccount, login, logout } from "@/repository/userRepository";

export async function getExamsBySearchTerm(searchTerm: string) {
    const res =  await findExamBySearchTerm(searchTerm);
    console.log(res);
    console.log("Retrieved exams")
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
