import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const db = new PrismaClient();

export async function accountExists(username:string , email:string) {
    var num_account = await db.user.count(
        {
            where:{
                OR:[
                    {username: {equals:username}},
                    {email: {equals:email}}
                ]
            }
        }
    )
    return num_account > 0;    
}

export async function createAccount(username:string, email:string, password:string){
    const res = await db.user.create(
        {
            data:{
                username : username,
                hashed_pass : await bcrypt.hash(password,10),
                email : email
            }
        }
    )
    console.log(res);
    
    return res;
}

export async function login(identifier:string, password:string){
    const user = await db.user.findFirst(
        {
            where:{
                OR:[
                    {username: {equals:identifier}},
                    {email: {equals:identifier}},
                ]
            }
        }
    )
    if(!user){
        return {"error":"No user exists by that email/username"};
    }
    if(! (await bcrypt.compare(user.hashed_pass, password))){
        return {"error":"Incorrect password"};
    }
    //create user session and return it
    
    const sessions = await db.userSession.findMany(
        {
            where:{user_id:user.id},
            orderBy:{ created_at: 'desc' }
        }
    )

    var token = '';
    if (sessions[0].expires_at < new Date()){
        let expiration_date = new Date();
        expiration_date.setHours(expiration_date.getHours()+1);
        var new_session = await db.userSession.create(
            {data:{
                    user_id: user.id,
                    expires_at: expiration_date,
                    token: jwt.sign({userId: user.id},process.env.JWT_SECRET as string ,{expiresIn:"1h"})
                }
            }
        )
        token = new_session.token;
    }
    if(token===''){
        return {'error':'Could not login'}
    }
    return {"token": token}; //placeholder
}

export async function logout(sessionId:number){
    const res = await db.userSession.update(
        {
            where: {id:sessionId},
            data: {is_terminated:true}
        }
    )
    return res;
}


