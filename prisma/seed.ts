import {prisma} from './prisma-client';
import {$Enums} from ".prisma/client";
import UserRole = $Enums.UserRole;
import {hashSync} from "bcrypt";



async function up(){
    await prisma.user.createMany({
        data : [
            {
                fullName : 'User test',
                email : 'us1er@test.ua',
                password :  hashSync('123123123',10),
                verified : new Date(),
                role : UserRole.USER,
            },
            {
                fullName : 'Admin',
                email : 'adm3in@test.ua',
                password :  hashSync('34343434',10),
                verified : new Date(),
                role : UserRole.ADMIN,
            }
        ]
    });
}

async function down(){
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}
async function main(){
    try{
        await up();
        // await down();
    }catch (e){
        console.error(e);
    }
}
main().then(async ()=>{
    await prisma.$disconnect();
})