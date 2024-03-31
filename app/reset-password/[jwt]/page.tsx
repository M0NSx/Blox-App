import ResetPasswordForm from "@/components/ForgotPassword/ResetpasswordForm/ResetPasswordForm"
import { verifyJwt } from "@/lib/jwt"
import "@/app/reset-password/[jwt]/resetjwt.modules.css"

interface Props {
    params: {
        jwt: string
    }
}

export default function ResetPasswordPage({ params }: Props) {

  const payload = verifyJwt(params.jwt)

  if (!payload) return (
    <div className="bg-[#1F2028] flex justify-center items-center h-screen">
      <div>
        <p className=" text-red-500 text-2xl">Invalid link</p>
      </div>
    </div>
  )

  return (
    <ResetPasswordForm jwtUserId={params.jwt} />
  )
}
