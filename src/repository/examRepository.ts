import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function findAllExams(){
    return await db.exam.findMany();
}

export async function findExamBySearchTerm(searchTerm: string){
    return await db.exam.findMany({
        where:{
            OR:[
                {course_code: {contains:searchTerm}},
                {course_name: {contains:searchTerm}}
            ]
        }
    })
}

export async function findUserFavoritedExam(userId: number){
    return await db.exam.findMany(
        {
            where:{UserFavoritedExam:{some:{user_id:{equals:userId}}}}
        }
    );
}

export async function addUserFavoriteExam(userId: number, examId: number){
    db.userFavoritedExam.create({
        data:{
            user_id:userId,
            exam_id:examId
        }
    })
}

