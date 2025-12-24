import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Backend URL (Make sure .env file has VITE_API_BASE_URL=http://localhost:5000)
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ SUCCESS: Store Token
      localStorage.setItem("token", data.token);
      
      // Redirect to Dashboard
      navigate("/admin/dashboard");

    } catch (err) {
      console.error(err);
      setError("Server connection failed. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleLogin}>
        <h2 className="login-title">Symbiotec CMS</h2>
        <p className="login-subtitle">Administrator Login</p>

        <input
          className="login-input"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <div className="login-error" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Verifying..." : "Login"}
        </button>

        <div className="login-footer">
          © {new Date().getFullYear()} Symbiotec
        </div>
      </form>
    </div>
  );
}