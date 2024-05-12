'use server';

import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function addComboLike(formData: FormData) {
    const session = await getServerSession();
    const comboId = formData.get("comboId") as string;
    const pathName = formData.get("pathName") as string;

    const data = await prisma.like.create({
        data: {
            combo: {
                connect: {
                    id: comboId,
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

export async function removeComboLike(formData: FormData) {
    const session = await getServerSession();
    const likeId = formData.get("likeId") as string;
    const pathName = formData.get("pathName") as string;

    const likeDetails = await prisma.like.findUnique({
        where: { id: likeId },
    });

    if (!likeDetails) {
        console.error("Like not found");
        return;
    }

    await prisma.like.delete({
        where: { id: likeId },
    });

    revalidatePath(pathName);
}

export async function addFavoriteCombo(formData: FormData) {
    const session = await getServerSession();
    const comboId = formData.get("comboId") as string;
    const pathName = formData.get("pathName") as string;

    const data = await prisma.favorite.create({
        data: {
            combo: {
                connect: {
                    id: comboId,
                },
            },
            user: {
                connect: {
                    email: session?.user?.email!,
                }
            },
        }
    })

    revalidatePath(pathName);
}

export async function removeFavoriteCombo(formData: FormData) {
    const favoriteId = formData.get("favoriteId") as string;
    const pathName = formData.get("pathName") as string;

    const data = await prisma.favorite.delete({
        where: { id: favoriteId },
    })

    revalidatePath(pathName);
}

export async function deleteCombo(formData: FormData) {
    const comboId = formData.get("comboId") as string;
    const pathName = formData.get("pathName") as string;

    const combo = await prisma.combo.delete({
        where: { id: comboId },
    });

    revalidatePath(pathName);
}

export async function getSlugCombo(slug: string) {
    const session = await getServerSession();

    const data = await prisma.combo.findUnique({
        where: { slug: slug },
        select: {
            id: true,
            difficulty: true,
            author: true,
            slug: true,
            authorCreatedAt: true,
            authorImage: true,
            combotitle: true,
            combodescription: true,
            fightingstyle: true,
            weapon: true,
            fruit: true,
            sword: true,
            specialty: true,
            createdAt: true,
            mainStats: true,
            comboVideo: true,
            race: true,
            comments: {
                select: {
                    id: true,
                    text: true,
                    userName: true,
                    userImage: true,
                    createdAt: true,
                    user: {
                        select: {
                            name: true,
                            image: true,
                            id: true
                        }
                    },
                    likes: {
                        select: {
                            id: true,
                            commentId: true,
                            userId: true,
                            createdAt: true,
                        }
                    }
                }
            },
            user: {
                select: {
                    name: true,
                    image: true,
                    id: true
                }
            },         
            favorites: {
                select: {
                    id: true,
                    comboId: true,
                    userId: true,
                    createdAt: true,
                }
            },
            comboLikes: {
                select: {
                    id: true,
                    comboId: true,
                    userId: true,
                    createdAt: true,
                }
            }
          }
    })

    return data;
}