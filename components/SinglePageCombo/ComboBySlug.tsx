import Image from "next/image";
import React from "react";
import { HoverComboAuthor } from "../HtmlComponents/HoverComboAuthor";
import FavortiteLikeBtn from "../SinglePageCombo/FavoriteLikeBtn";
import { Combo } from "@/lib/types";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { Textarea } from "@/components/ui/textarea"
import { DifficultyBadge, RaceBadge, SpecialtyBadge, StatsBadge } from "../HtmlComponents/ComboBadges";
import ComboVideo from "../HtmlComponents/ComboVideo";
import { Separator } from "../ui/separator";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";


type Props = {
  combo: Combo;
}

export default async function ComboBySlug({ combo }: Props) {

  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    select: {
      email: true,
      id: true,
      name: true,
      image: true,
      createdAt: true,
    }
  })

  return (
    <section className="w-full grid grid-cols-1 gap-2 p-2">
      <div className="flex items-center w-full gap-2 border rounded-[8px] p-2">
        <h1 className="text-[12px]">
          You are viewing the combo{" "}
          <span className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent">{combo.combotitle}</span>
        </h1>
      </div>
      <div className="sm:grid sm:grid-cols-2 sm:mx-4 sm:p-4">
        <div>
          <div className="flex petit:justify-center sm:grid sm:grid-cols-2 w-full gap-2 sm:gap-4">
            <Image
              src={combo.fightingstyle}
              className="
                border rounded-[8px] w-1/4 min-w-[60px] petit:w-[80px] sm:w-[130px]
                
              "
              alt=""
              width={60}
              height={60}
            />
            <Image
              src={combo.fruit}
              className="
                border rounded-[8px] w-1/4 min-w-[60px] petit:w-[80px] sm:w-[130px]
                
              "
              alt=""
              width={60}
              height={60}
            />
            <Image
              src={combo.sword}
              className="
                border rounded-[8px] w-1/4 min-w-[60px] petit:w-[80px] sm:w-[130px]
                
              "
              alt=""
              width={60}
              height={60}
            />
            <Image
              src={combo.weapon}
              className="
                border rounded-[8px] w-1/4 min-w-[60px] petit:w-[80px] sm:w-[130px]
                
              "
              alt=""
              width={60}
              height={60}
            />
          </div>
          <div className="flex items-center justify-between sm:hidden w-full gap-1">
            <div className="">
              built by
              <HoverComboAuthor
                authorCreatedAt={combo.authorCreatedAt.toDateString()}
                comboAuthor={combo.author}
                authorImage={combo.authorImage}
              />
            </div>
            <FavortiteLikeBtn
              combo={combo}
              comboId={combo.id}
              likeId={combo.comboLikes.find((like) => like.userId === user?.id)?.id}
              favoriteId={combo.favorites.find((like) => like.userId === user?.id)?.id}
              userId={user?.id}
              pathName={""}
              isInLikeList={!!combo.comboLikes.find((like) => like.userId === user?.id)}
              isInFavoriteList={!!combo.favorites.find((like) => like.userId === user?.id)}
              userEmail={user?.email}
            />
          </div>
        </div>
        <Textarea className="h-[120px] sm:h-[276.5px]" readOnly value={combo.combodescription} />
      </div>
      <div className="items-center justify-between sm:justify-center hidden sm:flex w-full gap-1">
        <div className="">
          built by
          <HoverComboAuthor
            authorCreatedAt={combo.authorCreatedAt.toDateString()}
            comboAuthor={combo.author}
            authorImage={combo.authorImage}
          />
        </div>
        <FavortiteLikeBtn
          combo={combo}
          comboId={combo.id}
          likeId={combo.comboLikes.find((like) => like.userId === user?.id)?.id}
          favoriteId={combo.favorites.find((like) => like.userId === user?.id)?.id}
          userId={user?.id}
          pathName={""}
          isInLikeList={!!combo.comboLikes.find((like) => like.userId === user?.id)}
          isInFavoriteList={!!combo.favorites.find((like) => like.userId === user?.id)}
          userEmail={user?.email}
        />
      </div>
      <h2 className="font-bold">Combo Properties:</h2>
      <div className="flex gap-2">
        <SpecialtyBadge specialty={combo.specialty} />
        <RaceBadge race={combo.race} />
        <StatsBadge stats={combo.mainStats} />
        <DifficultyBadge difficulty={combo.difficulty} />
      </div>
      <ComboVideo comboVideo={combo.comboVideo} />
      <Separator className="text-black mt-2" />
    </section>
  );
}
