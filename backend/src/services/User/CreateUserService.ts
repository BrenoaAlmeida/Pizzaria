import prismaClient from '../../prisma'

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

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: password
            },
            select:{
                name: true,
                email: true,
                password: true
            }
        })

        return user;
    }
}

export { CreateUserService }