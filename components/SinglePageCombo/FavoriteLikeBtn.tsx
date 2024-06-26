import { getServerSession } from "next-auth";
import React from "react";
import AddLikeButton, { AddFavoriteButton, AddLikeParagraph, RemoveFavoriteButton, RemoveLikeButton, RemoveLikeParagraph } from "../SubmitButtons/SubmitButtons";
import { addComboLike, addFavoriteCombo, removeComboLike, removeFavoriteCombo } from "@/lib/actions/comboActions";
import { Combo } from "@/lib/types";
import { authOptions } from '../../app/api/auth/[...nextauth]/authOption';

type Props = {
  combo: Combo;
  comboId: string;
  likeId: string | undefined;
  favoriteId: string | undefined;
  userId: string | undefined;
  userEmail: string | undefined | null;
  pathName: string;
  isInLikeList: boolean;
  isInFavoriteList: boolean;
}

export default async function FavortiteLikeBtn({ combo, comboId, likeId, favoriteId, userId, userEmail, pathName, isInLikeList, isInFavoriteList }: Props) {

  const session: any = await getServerSession(authOptions);

  function formatNumber(num: number): string {
    if (num < 1000) {
      return num.toString();
    } else if (num < 1000000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return (num / 1000000).toFixed(2) + 'm';
    }
  };

  const likes = 71687;

  return (
    <div className="justify-center">
      {session?.user && session?.user.email === userEmail && (
        <div className="flex items-center gap-[5px]">
          {isInFavoriteList ? (
            <form className="mt-1" action={removeFavoriteCombo}>
              <input type="hidden" name="pathName" value={pathName || ""} />
              <input type="hidden" name="favoriteId" value={favoriteId} />
              <RemoveFavoriteButton />
            </form>
          ) : (
            <form className="mt-1" action={addFavoriteCombo}>
              <input type="hidden" name="pathName" value={pathName || ""} />
              <input type="hidden" name="comboId" value={comboId} />
              <AddFavoriteButton />
            </form>
          )}
          {isInLikeList ? (
            <form className="mt-1 flex gap-1" action={removeComboLike}>
              <input type="hidden" name="pathName" value={pathName || ""} />
              <input type="hidden" name="comboId" value={comboId} />
              <RemoveLikeButton />
              <RemoveLikeParagraph combo={combo} />
            </form>
          ) : (
            <form className="mt-1 flex gap-1" action={addComboLike}>
              <input type="hidden" name="pathName" value={pathName || ""} />
              <input type="hidden" name="comboId" value={comboId} />
              <input type="hidden" name="userId" value={session.user.id} />
              <AddLikeButton />
              <AddLikeParagraph combo={combo} />
            </form>
          )}
          
        </div>
      )}
    </div>
  );
}
