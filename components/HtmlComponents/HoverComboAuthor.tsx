"use client";

import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type Props = {
  comboAuthor: string;
  authorImage: string;
  authorCreatedAt: Date;
};

export function HoverComboAuthor({
  comboAuthor,
  authorImage,
  authorCreatedAt,
}: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className="m-0 ml-1 p-0 underline" variant="link">
          @{comboAuthor}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-[280px] petit:w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={authorImage} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{comboAuthor}</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined at {authorCreatedAt.toString().slice(0, 15)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

type PropsComment = {
  commentAuthor: string;
  authorImage: string;
  authorCreatedAt: Date;
};

export function HoverCommentAuthor({
  commentAuthor,
  authorImage,
  authorCreatedAt,
}: PropsComment) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className="border rounded-full h-fit border-black">
          <AvatarImage src={authorImage} />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-[280px] petit:w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={authorImage} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{commentAuthor}</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined at {authorCreatedAt.toString().slice(0, 15)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
