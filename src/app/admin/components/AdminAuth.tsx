"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

const ADMIN_PASSWORD = "1122334455";
const AUTH_KEY = "admin_authenticated";

interface UseAdminAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export function useAdminAuth(): UseAdminAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem(AUTH_KEY);
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = (): void => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
}

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password.trim()) {
      setError("Please enter the password");
      return;
    }

    const success = login(password);
    if (!success) {
      setError("Incorrect password");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <motion.div
          className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl"
          animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <ShieldCheck className="w-10 h-10 text-white" />
            </motion.div>
          </div>

          {/* Title */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-gray-400 text-sm">
              Enter password to access the admin panel
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-12 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Error message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/20 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Access Admin Panel
            </motion.button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-gray-500 text-sm mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Protected area • KPI Total
        </motion.p>
      </motion.div>
    </div>
  );
}
