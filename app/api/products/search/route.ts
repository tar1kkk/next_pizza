// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/prisma/prisma-client";
//
// export async function GET(req: NextRequest) {
//     const query : string = req.nextUrl.searchParams.get('query') || '';
//
//     const products = await prisma.product.findMany({
//         where: {
//             name: {
//                 contains: query,
//                 mode : 'insensitive'
//             }
//         }
//     });
//
//     return NextResponse.json({ products });
// }
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
    const query: string = req.nextUrl.searchParams.get('query') || '';

    try {
        const products = await prisma.product.findMany();

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        return NextResponse.json({ products: filteredProducts.slice(0,5) });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching products' });
    }
}


