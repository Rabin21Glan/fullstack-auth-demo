"use client"

import { VERIFY_EMAIL_MUTATION } from "@/lib/mutations"
import { useMutation } from "@apollo/client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, XCircle, Mail, ArrowRight, RefreshCw } from "lucide-react"
import { Card, CardBody, CardHeader, Button, Spinner } from "@heroui/react"

export default function VerifyEmailPage() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [verifyEmail, { loading }] = useMutation(VERIFY_EMAIL_MUTATION)

  const handleSubmit = async () => {
    setError("")
    setSuccess("")

    try {
      const { data } = await verifyEmail({ variables: { token } })

      console.log(data.verifyEmail)
      if (data?.verifyEmail?.message) {
        setSuccess(data.verifyEmail.message)
        // Redirect after a short delay to show success message
        setTimeout(() => {
          router.push("/auth/login")
        }, 2000)
      }
    } catch (err: any) {
      setError(err.message || "Verification failed")
    }
  }

  useEffect(() => {
    if (token) handleSubmit()
  }, [token])

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
              <Spinner size="lg" color="primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Verifying Email
          </h1>
          <p className="text-default-500 text-lg">Please wait while we verify your email address...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-danger/20 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-danger" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-danger mb-4">Verification Failed</h1>
          <p className="text-default-500 text-lg">We couldn't verify your email address</p>
        </div>
      )
    }

    if (success) {
      return (
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent mb-4">
            Email Verified!
          </h1>
          <p className="text-default-500 text-lg">Your account has been successfully verified</p>
        </div>
      )
    }

    // No token case
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center">
            <Mail className="w-10 h-10 text-warning" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-warning mb-4">Invalid Link</h1>
        <p className="text-default-500 text-lg">This verification link is invalid or has expired</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-default-100 p-4">
      <div className="w-full max-w-md">
        {/* Hero Header */}
        {renderContent()}

        {/* Status Card */}
        <Card className="w-full shadow-2xl mt-8">
          <CardHeader className="flex flex-col gap-3 pb-0">
            <h2 className="text-2xl font-semibold text-center">
              {loading && "Verification in Progress"}
              {error && "Verification Error"}
              {success && "Welcome to Our Platform"}
              {!loading && !error && !success && !token && "Missing Verification Token"}
            </h2>
          </CardHeader>

          <CardBody className="gap-4">
            {loading && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Spinner size="sm" color="primary" />
                  <div>
                    <h3 className="font-medium text-default-700 mb-1">Processing Verification</h3>
                    <p className="text-small text-default-500">
                      We're verifying your email address. This should only take a moment.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <>
                <div className="bg-danger/10 border border-danger/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-danger mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-default-700 mb-1">Verification Failed</h3>
                      <p className="text-small text-default-500 mb-2">{error}</p>
                      <p className="text-small text-default-500">Sorry for the inconvenience. Please try again.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleSubmit}
                    color="primary"
                    size="lg"
                    className="w-full font-semibold"
                    radius="lg"
                    startContent={<RefreshCw size={18} />}
                    isDisabled={!token}
                  >
                    Try Again
                  </Button>

                  <Button
                    as={Link}
                    href="/auth/register"
                    variant="bordered"
                    size="lg"
                    className="w-full font-semibold"
                    radius="lg"
                  >
                    Back to Registration
                  </Button>
                </div>
              </>
            )}

            {success && (
              <>
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-default-700 mb-1">Email Successfully Verified</h3>
                      <p className="text-small text-default-500 mb-2">{success}</p>
                      <p className="text-small text-default-500">
                        Thanks for verifying your email! You can now sign in to your account.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                  <p className="text-small text-default-600 text-center">
                    🎉 Redirecting you to sign in page in a few seconds...
                  </p>
                </div>

                <Button
                  as={Link}
                  href="/auth/login"
                  color="primary"
                  size="lg"
                  className="w-full font-semibold"
                  radius="lg"
                  endContent={<ArrowRight size={18} />}
                >
                  Continue to Sign In
                </Button>
              </>
            )}

            {!loading && !error && !success && !token && (
              <>
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-default-700 mb-1">Invalid Verification Link</h3>
                      <p className="text-small text-default-500">
                        This link appears to be invalid or has expired. Please request a new verification email.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    as={Link}
                    href="/auth/register"
                    color="primary"
                    size="lg"
                    className="w-full font-semibold"
                    radius="lg"
                  >
                    Register New Account
                  </Button>

                  <Button
                    as={Link}
                    href="/auth/login"
                    variant="bordered"
                    size="lg"
                    className="w-full font-semibold"
                    radius="lg"
                  >
                    Back to Sign In
                  </Button>
                </div>
              </>
            )}
          </CardBody>
        </Card>

      
      </div>
    </div>
  )
}
