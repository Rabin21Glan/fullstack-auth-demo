"use client"

import Link from "next/link"
import { Mail, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardBody, CardHeader, Button, Divider } from "@heroui/react"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-default-100 p-4">
      <div className="w-full max-w-md">
        {/* Hero Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <Mail className="w-10 h-10 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Check Your Email
          </h1>
          <p className="text-default-500 text-lg">We've sent you a verification link</p>
        </div>

        {/* Verification Card */}
        <Card className="w-full shadow-2xl">
          <CardHeader className="flex flex-col gap-3 pb-0">
            <h2 className="text-2xl font-semibold text-center">Verify Your Email Address</h2>
            <p className="text-small text-default-500 text-center">
              Please check your email and click the verification link to activate your account
            </p>
          </CardHeader>

          <CardBody className="gap-6">
            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-default-700 mb-1">Email Sent Successfully</h3>
                    <p className="text-small text-default-500">
                      We've sent a verification email to your inbox. Click the link in the email to verify your account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-default-700">What's next?</h4>
                <ul className="space-y-2 text-small text-default-500">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Check your email inbox (and spam folder)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Click the verification link in the email
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Return here to sign in to your account
                  </li>
                </ul>
              </div>
            </div>

            <Divider className="my-4" />

            <div className="space-y-3">
              <Button
                as={Link}
                href="https://mail.google.com"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                size="lg"
                className="w-full font-semibold"
                radius="lg"
                endContent={<ArrowRight size={18} />}
              >
                Open Gmail
              </Button>

              <Button as={Link} href="/login" variant="bordered" size="lg" className="w-full font-semibold" radius="lg">
                Back to Sign In
              </Button>
            </div>

            <Divider className="my-4" />

            <div className="text-center">
              <p className="text-small text-default-500 mb-2">Didn't receive the email?</p>
              <Button variant="light" size="sm" className="text-primary font-medium">
                Resend verification email
              </Button>
            </div>
          </CardBody>
        </Card>

     
      </div>
    </div>
  )
}
