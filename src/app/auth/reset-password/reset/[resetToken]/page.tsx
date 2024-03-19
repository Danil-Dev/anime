import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";


export default function ResetPasswordPage({params: {resetToken}} : {params: {resetToken:string}}){


  return(
    <ResetPasswordForm/>
  )
}