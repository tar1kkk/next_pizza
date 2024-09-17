import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";

export async function GET() {
    const ingredient = await prisma.ingredient.findMany();
    return NextResponse.json(ingredient);
}
