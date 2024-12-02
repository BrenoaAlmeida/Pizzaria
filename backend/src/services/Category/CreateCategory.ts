import prismaClient from "../../prisma";

class CreateCategoryService {
    async execute(name) {
        if(name === ''){
            throw Error('name cannot be empty');
        }

        const category = await prismaClient.category.create({
            data:{
                name:name
            },
            select:{
                id:true,
                name:true,
                created_at:true
            }
        })

        return category;
    }
}

export { CreateCategoryService }