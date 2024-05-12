'use server';

import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function addCommentLike(formData: FormData) {
    const session = await getServerSession();
    const commentId = formData.get("commentId") as string;
    const pathName = formData.get("pathName") as string;

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!,
        },
    })

    // Check if user exists
    if (!user) {
        console.error("User not found");
        return;
    }

    // Check if comment exists
    const comment = await prisma.comment.findUnique({
        where: {
            id: commentId,
        },
    });

    if (!comment) {
        console.error("Comment not found");
        return;
    }

    // check if user already liked
    const likeDetails = await prisma.commentLike.findFirst({
        where: {
            commentId: commentId,
            userId: user?.id,
        },
    })

    if (likeDetails) {
        console.error("Already liked");
        return;
    }
    
    await prisma.commentLike.create({
        data: {
            comment: {
                connect: {
                    id: commentId,
                },
            },
            user: {
                connect: {
                    email: session?.user?.email!,
                }
            },
        },
    });

    revalidatePath(pathName);
}

export async function removeCommentLike(formData: FormData) {
    const LikeId = formData.get("LikeId") as string;
    const pathName = formData.get("pathName") as string;

    const likeDetails = await prisma.commentLike.findUnique({
        where: { id: LikeId, },
    })

    if (!likeDetails) {
        console.error("Like not found");
        return;
    }

    await prisma.commentLike.delete({
        where: { id: LikeId, },
    })

    revalidatePath(pathName);
}

export const addComment = async (comboId: string, commentText: string) => {
    const session = await getServerSession();

    await prisma.comment.create({
        data: {
            text: commentText,
            user: {
                connect: {
                    email: session?.user?.email!,
                }
            },
            combo: {
                connect: {
                    id: comboId
                }
            }
        }
    })

}

export async function createComment(comboId: string, commentText: string, pathName: string) {
    try {
        await addComment(comboId, commentText);
    } catch (error) {
        return { error };
    } finally {
        revalidatePath(pathName);
    }
}

export async function getCommentsOfCombo(comboId: string) {

    const session = await getServerSession();
    const data = await prisma.comment.findMany({
        where: {
            comboId: comboId,
        },
        select: {
            id: true,
            text: true,
            comboId: true,
            userImage: true,
            userName: true,
            userId: true,
            user: {
                select: {
                    name: true,
                    image: true
                }
            },
            likes: {
                select: {
                    id: true,
                    commentId: true,
                    userId: true,
                    createdAt: true
                }
            }
        }
    })

    return data;
}