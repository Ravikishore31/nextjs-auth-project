"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    _id: "",
    username: "",
    email: "",
    isVerfied: false,
  });
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Logout failed");
    }
  };

  const getUserDetail: any = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/users/me");
      setData(res.data.data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/users/profile", data);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Reset password failed");
    } finally {
      setIsLoading(false);
      alert("Reset password link has been sent to your email");
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className={`mockup-code ${isLoading ? "hidden" : "block"}`}>
        <pre>
          <code>Profile</code>
        </pre>
        <pre>
          <code>{data && `Username: ${data.username}`}</code>
        </pre>
        <pre>
          <code>{data && `Email: ${data.email}`}</code>
        </pre>
        <pre>
          <code>
            {data &&
              `${
                data.isVerfied
                  ? "Email is Verified :)"
                  : "Email is not verified :("
              }`}
          </code>
        </pre>
        <pre>
          <code>
            <button onClick={logout} className="btn btn-accent mt-3">
              Logout
            </button>
          </code>
        </pre>
        {/* reset password */}

        <pre>
          <code>
            <button onClick={resetPassword} className="btn btn-accent mt-3">
              Reset Password
            </button>
          </code>
        </pre>
      </div>
      {isLoading && (
        <span className="loading loading-infinity loading-lg absolute"></span>
      )}
    </div>
  );
}
