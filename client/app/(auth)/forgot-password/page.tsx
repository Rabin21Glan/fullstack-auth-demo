"use client";

import { FORGOT_PASSWORD_MUTATION } from '@/lib/mutations';
import { useMutation } from '@apollo/client';
import { Input } from '@heroui/input';
import React, { useState } from 'react';

function ForgotPasswordPage() {
  const [forgotPassword, { loading, error, data }] = useMutation(FORGOT_PASSWORD_MUTATION);
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleResetPasswordReq = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await forgotPassword({
        variables: { email },
      });

      if (data?.forgotPassword?.message) {
        setMessage('Password reset link sent successfully!');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (e) {
      setMessage('An error occurred. Please check your email and try again.');
    }
  };

  return (
    <form onSubmit={handleResetPasswordReq} className="flex flex-col gap-4 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold">Forgot Password</h2>

      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>

      {message && <p className="text-sm text-green-600">{message}</p>}
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </form>
  );
}

export default ForgotPasswordPage;
