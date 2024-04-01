import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function AvatarDemo({ userImg, nickname }: any) {
    return (
      <Avatar>
        <AvatarImage src={userImg} alt={nickname} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }
  