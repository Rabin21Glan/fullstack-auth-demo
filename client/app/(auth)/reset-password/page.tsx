"use client"

import { RESETPASSWORD_MUTATION } from "@/lib/mutations"
import { useMutation } from "@apollo/client"
import { Button, Card, CardBody, CardHeader, Divider, Input, Spacer } from "@heroui/react"
import { Eye, EyeOff, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function PasswordResetPage() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [resetPassword, { loading }] = useMutation(RESETPASSWORD_MUTATION)
  const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleSubmit = async () => {
    setError("")
    setSuccess("")

    try {
      const { data } = await resetPassword({ variables: { input:{
        token,
        newPassword
      }} })

      console.log(data.resetPassword.message)
      if (data?.resetPassword?.message) {
        setSuccess(data.resetPassword.message)
       
          router.push("/login")
        
      }
    } catch (err: any) {
      setError(err.message || "Verification failed")
    }
  }



  return   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-default-100 p-4">
      <div className="w-full max-w-md">
     
        {/* Login Card */}
        <Card className="w-full shadow-2xl">
          <CardHeader className="flex flex-col gap-3 pb-0">

            <p className="text-small text-default-500 text-center">
Reset Password
            </p>
          </CardHeader>
          {error&&<p className="text-danger-400">
      {error}
            </p>}

          <CardBody className="gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
             
            

              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                startContent={<Lock className="text-default-400 pointer-events-none flex-shrink-0" size={18} />}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="text-default-400 pointer-events-none" size={18} />
                    ) : (
                      <Eye className="text-default-400 pointer-events-none" size={18} />
                    )}
                  </button>
                }
                variant="bordered"
                isRequired
                classNames={{
                  input: "text-small",
                  inputWrapper: "h-12",
                }}
              />


              <Input
                type={showConfirmPassword ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                startContent={<Lock className="text-default-400 pointer-events-none flex-shrink-0" size={18} />}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="text-default-400 pointer-events-none" size={18} />
                    ) : (
                      <Eye className="text-default-400 pointer-events-none" size={18} />
                    )}
                  </button>
                }
                variant="bordered"
                isRequired
                classNames={{
                  input: "text-small",
                  inputWrapper: "h-12",
                }}
              />

              <Spacer y={2} />

              <Button
                type="submit"
                color="primary"
                size="lg"
                isLoading={loading}
                className="w-full font-semibold"
                radius="lg"
              >
                {loading ? "resetting..." : "Reset Password"}
              </Button>

              <Divider className="my-4" />

              <p className="text-center text-small">
                <span className="text-default-500">Need to create an account? </span>
                <Link href="/register" className="text-primary hover:text-primary-600 font-medium">
                  Sign up
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>

       
      </div>
    </div>
}