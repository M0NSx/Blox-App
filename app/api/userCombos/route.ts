import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {

    const session = await getServerSession()

    try {
        const user_combos = await prisma.combo.findMany({
            where: {
                author: session?.user?.name!,
            }
        })

        return NextResponse.json({ message: "user combos fetched", user_combos }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error fetching user combos" }, { status: 500 })
    }
}