'use server';

import { connect } from "http2";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";

export const createComment = async (data: FormData) => {
    
    const text = data.get('CommentText') as string
    const comboId = data.get('comboId') as string
    const userId = data.get('userId') as string
    const pathName = data.get('pathName') as string
     
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) return

    const combo = await prisma.combo.findUnique({
        where: {
            id: comboId
        },
    });

    if (!combo) return

    await prisma.comment.create({
        data: {
            text,
            user: {
                connect: {
                    id: userId,
                },
            },
            combo: {
                connect: {
                    id: comboId,
                },
            },
        },
    });

    revalidatePath(pathName)
}

export async function DeleteCommentAction(formData: FormData) {

    const session: any = await getServerSession(authOptions);
    const commentId = formData.get("commentId") as string;
    const pathName = formData.get("pathName") as string;
    const comboId = formData.get("comboId") as string;

    await prisma.comment.delete({
        where: {
            id: commentId,
            userId: session?.user?.id,
            comboId,
        }

    });

    revalidatePath(pathName);
}