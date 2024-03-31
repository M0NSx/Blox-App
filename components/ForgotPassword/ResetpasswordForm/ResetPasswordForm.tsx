'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, button } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"
import { MdKey } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from 'react';
import { ResetPassword } from "@/lib/actions/authActions";
import { toast } from "react-toastify";

interface Props {
    jwtUserId: string
}

const FormSchema = z
.object({
    password: 
        z.string()
        .min(1, 'Password is required')
        .max(30, 'Password is too long'),
    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ['confirmPassword'],
})

type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({ jwtUserId }: Props ) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InputType>({
        resolver: zodResolver(FormSchema)
    })

    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const togglePass = () => setIsVisiblePass(prev => !prev);

    const resetPass: SubmitHandler<InputType> = async (data) => {
        try {
            const result = await ResetPassword(jwtUserId, data.password);
            if (result === 'success') toast.success("Password changed");
        } catch (err) {
            toast.error("Error changing password");
            console.log(err);
        }
    };

  return (
    <div className="bg-[#1F2028] h-screen">
        <div className='grid place-items-center'>
            <div className='p-5 bg-[#2d3136] shadow-lg rounded-lg border-t-4 border-[#3d95ec] mt-[40px]'>
                <h1 className="text-xl text-white font-bold my-4">Reset Password</h1>
                <form onSubmit={handleSubmit(resetPass)} className="flex flex-col gap-3 w-[400px]">
                    <Input
                        errorMessage={errors.password?.message}
                        {...register('password')}
                        type={isVisiblePass ? "text" : "password"}
                        className='text-black'
                        startContent={<MdKey className="cursor-pointer w-[24px] h-[24px]" />}
                        endContent={isVisiblePass ? <IoEyeOff className="cursor-pointer w-[24px] h-[24px]"
                        onClick={togglePass} /> : <IoEye className="cursor-pointer w-[24px] h-[24px]" onClick={togglePass} />}
                        placeholder='Password'
                    />
                    <Input
                        errorMessage={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                        type={isVisiblePass ? "text" : "password"}
                        className='text-black'
                        startContent={<MdKey className="cursor-pointer w-[24px] h-[24px]" />}
                        placeholder='Confirm Password'
                    />
                    <Button
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                        type="submit"
                        className="bg-[#3d95ec] gap-[10px] hover:bg-[#51a8ff] transition-all font-bold cursor-pointer px-6 py-2">
                        {isSubmitting ? "": "Reset Password"}
                    </Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ResetPasswordForm
