"use client"
import { useState } from "react"
import type React from "react"

import { useMutation } from "@apollo/client"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { LOGIN_MUTATION } from "@/lib/mutations"
import { useRouter } from "next/navigation"

import { Card, CardBody, CardHeader, Input, Button, Divider, Spacer } from "@heroui/react"

export default function LoginHero() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const [login, { loading }] = useMutation(LOGIN_MUTATION)

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

      if (data?.login) {
        localStorage.setItem("auth", JSON.stringify(data.login))
        router.push("/")
      }
    } catch (err: any) {
      setError(err.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-default-100 p-4">
      <div className="w-full max-w-md">
        {/* Hero Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Welcome Back
          </h1>
          <p className="text-default-500 text-lg">Sign in to your account to continue your journey</p>
        </div>

        {/* Login Card */}
        <Card className="w-full shadow-2xl">
          <CardHeader className="flex flex-col gap-3 pb-0">
            <h2 className="text-2xl font-semibold text-center">Sign in to your account</h2>
            <p className="text-small text-default-500 text-center">
              Enter your credentials below to access your account
            </p>
          </CardHeader>

          <CardBody className="gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startContent={<Mail className="text-default-400 pointer-events-none flex-shrink-0" size={18} />}
                variant="bordered"
                isRequired
                classNames={{
                  input: "text-small",
                  inputWrapper: "h-12",
                }}
              />

              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {loading ? "Signing in..." : "Sign in"}
              </Button>

              <Divider className="my-4" />

              <p className="text-center text-small">
                <span className="text-default-500">Need to create an account? </span>
                <Link href="/auth/register" className="text-primary hover:text-primary-600 font-medium">
                  Sign up
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>

       
      </div>
    </div>
  )
}
