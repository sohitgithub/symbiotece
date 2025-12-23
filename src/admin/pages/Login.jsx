// import React, { useState } from "react";
// import "./Login.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const baseUrl = import.meta.env.VITE_API_BASE_URL;

//   async function submit(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch(`${baseUrl}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Login failed");
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);

//       window.location.href = "/admin/dashboard";
//     } catch (err) {
//       setError("Server not reachable");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="login-wrapper">
//       <form className="login-card" onSubmit={submit}>
//         <h2 className="login-title">Symbiotec CMS</h2>
//         <p className="login-subtitle">Administrator Login</p>

//         <input
//           className="login-input"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email address"
//           required
//         />

//         <input
//           className="login-input"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />

//         {error && <div className="login-error">{error}</div>}

//         <button className="login-btn" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <div className="login-footer">
//           © {new Date().getFullYear()} Symbiotec
//         </div>
//       </form>
//     </div>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // TEMP AUTH (replace with API later)
    localStorage.setItem("adminAuth", "true");

    navigate("/admin/dashboard");
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
          required
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>

        <div className="login-footer">
          © {new Date().getFullYear()} Symbiotec
        </div>
      </form>
    </div>
  );
}
