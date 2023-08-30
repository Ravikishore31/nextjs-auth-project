"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("nothing");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const passwordReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        token,
        newPassword,
      });
    } catch (error: any) {
      setError(true);
      console.log(error.message);
    } finally {
      setLoading(false);
      logout();
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "nothing");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className={`mockup-code ${loading ? "hidden" : "block"}`}>
        <pre>
          <code>Reset Password</code>
        </pre>
        <pre data-prefix=">" className="text-success">
          <code>
            <input
              id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password"
              className="input w-fit max-w-xs bg-transparent p-0"
            />
          </code>
        </pre>
        <pre>
          <code>
            <button onClick={passwordReset} className="btn btn-accent mt-3">
              Reset
            </button>
          </code>
        </pre>
      </div>

      {loading && (
        <span className="loading loading-infinity loading-lg absolute"></span>
      )}
    </div>
  );
}
