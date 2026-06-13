import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await api.post("/api/auth/login", { email, password });
      nav("/admin/dashboard");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
      >
        <h1 className="text-xl font-semibold mb-4">Admin Login</h1>

        <label className="text-sm text-zinc-300">Email</label>
        <input
          className="w-full mt-1 mb-3 p-2 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm text-zinc-300">Password</label>
        <input
          type="password"
          className="w-full mt-1 mb-3 p-2 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {err && <div className="text-red-400 text-sm mb-3">{err}</div>}

        <button className="w-full bg-white text-black font-semibold p-2 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
}
