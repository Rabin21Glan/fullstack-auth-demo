import AuthContext from "@/context/authContext"
import { FORGOT_PASSWORD_MUTATION, LOGIN_MUTATION, RESEND_VERIFICATION_EMAIL_MUTATION, RESETPASSWORD_MUTATION } from "@/lib/mutations"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"

export const useLogin= ()=>{
     const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [showPassword, setShowPassword] = useState(false)
      const [error, setError] = useState("")
      const [success,setSuccess] = useState("")
      
   
 const {setAuth} = useContext(AuthContext);
   const router = useRouter()
  const [resendVerificationEmail,{loading:loadingtwo}] = useMutation(RESEND_VERIFICATION_EMAIL_MUTATION)

   

      
  const handlResendVerification = async ()=>{
     try {
      const { data } = await resendVerificationEmail({
        variables: {
          email
        },
      })

      if (data?.resendVerificationEmail) {
        setError("")
     
              setSuccess(data?.resendVerificationEmail.message)
        
        
      }
    } catch (err: any) {
      
      setError(err.message || "Verificaiton failed")
    }

  }

       const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const { data } = await login({
        variables: {
          input: {
            email,
            password,
          },
        },
      })

      console.log(data.login)
      if (data?.login) {
        setAuth(data.login);
        // console.log("Login successful:", data.login)

        console.log("Auth data saved to localStorage")
        
      }

      router.push("/")

      console.log("Login successful:", data.login)
    } catch (err: any) {
      
      setError(err.message || "Login failed")
    }
  }
     
      const [login, { loading }] = useMutation(LOGIN_MUTATION)

      return {
        handlResendVerification,
        handleSubmit,
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        error,
        
        success,
        
       
        loading
      }
}