"use client"

import AuthContext from "@/context/authContext"
import { LOGOUT_MUTATION } from "@/lib/mutations"
import { useMutation } from "@apollo/client"
import { Button, Card, CardBody, CardHeader, Chip, Code, Divider, Snippet } from "@heroui/react"
import { ArrowRight, LogOut, Shield, User } from "lucide-react"
import Link from "next/link"
import { useContext } from "react"

interface AuthData {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    isEmailVerified: boolean
    __typename: "User"
  }
  accessToken: string
  refreshToken: string
  __typename: "AuthResponse"
}

export default function Home() {
const {auth:authData,setAuth:setAuthData} = useContext(AuthContext);
  
const [signOut,{loading}] = useMutation(LOGOUT_MUTATION);
  


  const handleLogout = async() => {
    localStorage.removeItem("auth")
    setAuthData(null)
  const {data} =  await signOut(
    {
      variables:{
        refreshToken:authData?.refreshToken

      }
    }
  );

  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-default-100">
      {authData && 
        // Authenticated User Dashboard
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            {/* Hero Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  {authData.user.isEmailVerified && (
                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                Welcome back, {authData.user.firstName}!
              </h1>
              <p className="text-default-500 text-lg">Ready to continue your journey?</p>
            </div>

            {/* User Info Card */}
            <Card className="w-full shadow-2xl mb-6">
              <CardHeader className="flex flex-col gap-3 pb-0">
                <h2 className="text-2xl font-semibold text-center">Your Account</h2>
                <p className="text-small text-default-500 text-center">Account information and quick actions</p>
              </CardHeader>

              <CardBody className="gap-6">
                {/* User Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-default-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-default-700">Email Address</h3>
                      <p className="text-small text-default-500">{authData.user.email}</p>
                    </div>
                    {authData.user.isEmailVerified ? (
                      <Chip color="success" variant="flat" startContent={<Shield size={16} />}>
                        Verified
                      </Chip>
                    ) : (
                      <Chip color="warning" variant="flat">
                        Unverified
                      </Chip>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-4 bg-default-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-default-700">Full Name</h3>
                      <p className="text-small text-default-500">
                        {authData.user.firstName} {authData.user.lastName}
                      </p>
                    </div>
                  </div>
                </div>

                <Divider />

                {/* User ID Snippet */}
                <div className="space-y-2">
                  <h3 className="font-medium text-default-700">User ID</h3>
                  <Snippet hideCopyButton hideSymbol variant="bordered" className="w-full">
                    <Code color="primary">{authData.user.id}</Code>
                  </Snippet>
                </div>

                <Divider />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    as={Link}
                    href="/dashboard"
                    color="primary"
                    size="lg"
                    className="w-full font-semibold"
                    radius="lg"
                    endContent={<ArrowRight size={18} />}
                  >
                    Go to Dashboard
                  </Button>

                  <Button
                    onClick={handleLogout}
                    variant="bordered"
                    size="lg"
                    className="w-full font-semibold"
                    radius="lg"
                    startContent={<LogOut size={18} />}
                  >
                    Sign Out
                  </Button>
                </div>
              </CardBody>
            </Card>

           
          </div>
        </div>
}
{!authData && 
     
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
          
            <Card className="w-full shadow-2xl mb-6">
              <CardHeader className="flex flex-col gap-3 pb-0">
                <h2 className="text-2xl font-semibold text-center">Get Started Today</h2>
                <p className="text-small text-default-500 text-center">
                  Join thousands of users who are already building amazing projects
                </p>
              </CardHeader>

              <CardBody className="gap-6">
               
               

                <Divider />

              
                <div className="space-y-2">
                  <Snippet hideCopyButton hideSymbol variant="bordered" className="w-full">
                    <span>
                      Get started by <Code color="primary">creating your account</Code>
                    </span>
                  </Snippet>
                </div>

                <Divider />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    as={Link}
                    href="/register"
                    color="primary"
                    size="lg"
                    className="w-full font-semibold"
                    radius="lg"
                    endContent={<ArrowRight size={18} />}
                  >
                    Create Account
                  </Button>

                  <Button
                    as={Link}
                    href="/login"
                    variant="bordered"
                    size="lg"
                    className="w-full font-semibold"
                    radius="lg"
                  >
                    Sign In
                  </Button>
                </div>
              </CardBody>
            </Card>

          
          </div>
        </div>
      }
    </div>
  )
}
