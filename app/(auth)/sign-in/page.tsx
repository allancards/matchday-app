// app/sign-in/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-emerald-500 to-teal-400 p-4">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 transform transition-all hover:scale-[1.02] duration-300">
        {/* Logo/Ícone */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-4 rounded-full shadow-lg">
            <span className="text-4xl">⚽</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          MatchDay
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Organize seus eventos esportivos
        </p>

        <Button
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-md rounded-xl py-6 text-base font-semibold flex items-center justify-center gap-3 transition-all hover:shadow-lg"
        >
          <FcGoogle className="w-5 h-5 text-blue-600" />
          Entrar com Google
        </Button>
      </div>
    </div>
  );
}