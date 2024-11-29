import prismaClient from "../../prisma";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({email, password}: AuthRequest){
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        
        if(!user){            
            throw new Error("Usuario ou senha incorretos!!")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Usuario ou senha incorretos!!")
        }

        //Gera um token JTW  e devolve dados do usuario com Id, Name e email
        //Caso tenha dado tudo certo, gerar um token para o usuario
        const token = sign(
            {
               name: user.name,
               email: user.email 
            },
            process.env.JWT_SECRET,
            {
                subject:user.id,
                expiresIn:'30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token        
        }
    }
}

export {AuthUserService}  