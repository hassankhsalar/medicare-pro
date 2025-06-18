"use client";
import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/auth/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);

      if (user.role === "super_admin") {
        router.push("/admin/dashboard");
      } else if (user.role === "doctor") {
        router.push("/doctor/dashboard");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/login.jpg')" }} // 👈 here
    >
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-md border border-white/30 text-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-300 text-sm mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-white/30 bg-white/20 text-white placeholder-white/70 p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-white/30 bg-white/20 text-white placeholder-white/70 p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
