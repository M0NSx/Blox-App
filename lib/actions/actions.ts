'use server';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function addComboLike(formData: FormData) {
    const session = await getServerSession();
    const comboId = formData.get('comboId') as string;
    const pathName = formData.get('pathName') as string;

    const data = await prisma.like.create({
        data: {
            combo: {
                connect: {
                    id: comboId,
                }
            },
            user: {
                connect: {
                    email: session?.user?.email!,
                },
            },
        },
    });

    revalidatePath(pathName)
}

export async function removeComboLike(formData: FormData) {
    const likeId = formData.get('likeId') as string;
    const pathName = formData.get('pathName') as string;

    const data = await prisma.like.delete({
        where: {
            id: likeId,
        },
    });

    revalidatePath(pathName)
}

export async function addComboFavorite(formData: FormData) {
    const session = await getServerSession();
    const comboId = formData.get('comboId') as string;
    const pathName = formData.get('pathName') as string;

    const data = await prisma.favorite.create({
        data: {
            combo: {
                connect: {
                    id: comboId,
                }
            },
            user: {
                connect: {
                    email: session?.user?.email!,
                },
            },
        },
    });

    revalidatePath(pathName)
}

export async function removeComboFavorite(formData: FormData) {
    const favoriteId = formData.get('favoriteId') as string;
    const pathName = formData.get('pathName') as string;

    const data = await prisma.favorite.delete({
        where: {
            id: favoriteId,
        },
    });

    revalidatePath(pathName)
}

export async function DeleteCombo(formData: FormData) {
    const comboId = formData.get('comboId') as string;
    const pathName = formData.get('pathName') as string; 

    const data = await prisma.combo.deleteMany({
        where: {
            id: comboId,
        }
    });

    revalidatePath(pathName);
}

export async function getCombo(slug: string) {

    const session = await getServerSession();
    const data = await prisma.combo.findFirst({
        where: {
            combotitle: slug
        },
        select: {
            id: true,
            combotitle: true,
            combodescription: true,
            fightingstyle: true,
            weapon: true,
            fruit: true,
            sword: true,
            specialty: true,
            createdAt: true,
            comboVideo: true,
            authorImage: true,
            authorEmail: true,
            authorCreatedAt: true,
            mainStats: true,
            race: true,
            difficulty: true,
            author: true,
            favorites: {
                where: {
                    userId: session?.user.id!,
                },
            },
            comboLikes: {
                where: {
                    userId: session?.user.id!,
                },
            },
        }
    })

    return data
}