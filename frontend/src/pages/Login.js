import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async () => {
    try {
      if (isRegister) {
        await axios.post(
          "http://localhost:5000/api/auth/register",
          { name, email, password, role }
        );

        alert("Account Created");
        setIsRegister(false);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password }
        );

        localStorage.setItem("user", JSON.stringify(res.data));

        if (res.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div>
      <h2>{isRegister ? "Register" : "Login"}</h2>

      {isRegister && (
        <>
          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <select onChange={(e)=>setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </>
      )}

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submit}>
        {isRegister ? "Register" : "Login"}
      </button>

      <p onClick={()=>setIsRegister(!isRegister)}
         style={{cursor:"pointer", color:"blue"}}>
        {isRegister ? "Already have account? Login"
                    : "Create account"}
      </p>
    </div>
  );
}

export default Login;