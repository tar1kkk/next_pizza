// import {NextRequest, NextResponse} from "next/server";
// import {prisma} from "@/prisma/prisma-client";
//
// export async function POST(req : NextRequest){
//     try {
//         const body = (await req.json());
//
//         const order = await prisma.order.findFirst({
//             where: {
//                 id : Number(body.object.metadata.order_id)
//             },
//         });
//     }catch (e){
//         console.log(e);
//         return NextResponse.json({e : 'Error' })
//     }
// }