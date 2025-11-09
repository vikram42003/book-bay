"use client";

import { useUserStore } from "@/stores/storeProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormType = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const register = useUserStore((state) => state.register);

  const [formType, setFormType] = useState<FormType>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!username || !password) {
      setError("Username and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      if (formType === "login") {
        await login(username, password);
      } else {
        await register(username, password, referralCode);
      }
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFormType = () => {
    setFormType((prev) => (prev === "login" ? "register" : "login"));
    setError("");
    setUsername("");
    setPassword("");
    setReferralCode("");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {formType === "login" ? "Login" : "Register"}
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="your_username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
            />
          </div>
          {formType === "register" && (
            <div className="mb-6">
              <label htmlFor="referralCode" className="block text-gray-700 text-sm font-bold mb-2">
                Referral Code (Optional)
              </label>
              <input
                type="text"
                id="referralCode"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="friend's_code"
              />
            </div>
          )}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors disabled:bg-blue-300"
            >
              {isLoading ? "Processing..." : formType === "login" ? "Sign In" : "Create Account"}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              {formType === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button type="button" onClick={toggleFormType} className="font-bold text-blue-500 hover:text-blue-700">
                {formType === "login" ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
