"use client"
import type React from "react"
import { useState } from "react"

import { REGISTER_MUTATION } from "@/lib/mutations"
import { useMutation } from "@apollo/client"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button, Card, CardBody, CardHeader, Divider, Input, Spacer } from "@heroui/react"

export default function RegisterHero() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const router = useRouter()
  const [register, { loading }] = useMutation(REGISTER_MUTATION)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const { data } = await register({
        variables: {
          input: {
            email,
            password,
            firstName: firstName || undefined,
            lastName: lastName || undefined,
          },
        },
      })

      if (data?.register?.message) {
        setSuccess(data.register.message)
        router.push("/verify-email-message")
      }
    } catch (err: any) {
      setError(err.message || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-default-100 p-4">
      <div className="w-full max-w-md">
        {/* Hero Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Join Us Today
          </h1>
          <p className="text-default-500 text-lg">Create your account and start your journey</p>
        </div>

        {/* Registration Card */}
        <Card className="w-full shadow-2xl">
          <CardHeader className="flex flex-col gap-3 pb-0">
            <h2 className="text-2xl font-semibold text-center">Create your account</h2>
            <p className="text-small text-default-500 text-center">Fill in your details below to get started</p>
          </CardHeader>

          <CardBody className="gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg">
                  {success}
                </div>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="text"
                  label="First Name"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  startContent={<User className="text-default-400 pointer-events-none flex-shrink-0" size={18} />}
                  variant="bordered"
                  classNames={{
                    input: "text-small",
                    inputWrapper: "h-12",
                  }}
                />

                <Input
                  type="text"
                  label="Last Name"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  startContent={<User className="text-default-400 pointer-events-none flex-shrink-0" size={18} />}
                  variant="bordered"
                  classNames={{
                    input: "text-small",
                    inputWrapper: "h-12",
                  }}
                />
              </div>

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
                description="Must be 8+ characters with uppercase, lowercase, number and special character"
                classNames={{
                  input: "text-small",
                  inputWrapper: "h-12",
                }}
              />

              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                startContent={<Lock className="text-default-400 pointer-events-none flex-shrink-0" size={18} />}
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
                {loading ? "Creating account..." : "Create account"}
              </Button>

              <Divider className="my-4" />

              <p className="text-center text-small">
                <span className="text-default-500">Already have an account? </span>
                <Link href="/login" className="text-primary hover:text-primary-600 font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>

    
      </div>
    </div>
  )
}
