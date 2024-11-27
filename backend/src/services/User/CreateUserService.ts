import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest {
    name: string,
    email: string,
    password: string
}


class CreateUserService
{
    async execute({name, email, password}: UserRequest) {
        
        if(!email) {
            throw new Error("E-mail Incorreto!!")
        }
        //Verificar se o email ja esta cadastrado na plataforma!!
        const userAlreadyExists = await prismaClient.user.findFirst({where: {
            email: email
        }})        

        if(userAlreadyExists) {
            throw new Error("Usuario ja existe");
        }        

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            select:{
                name: true,
                email: true
            }
        })

        return user;
    }
}

export { CreateUserService }