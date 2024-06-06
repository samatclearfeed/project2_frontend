import { AuthContext } from "@/context/auth";
import React, { useState } from "react";
import { useContext } from "react";
import classes from "@/styles/login.module.css";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("email and password should not be empty!");
      return;
    }

    login({ email, password });
  };

  return (
    <div className={classes.main}>
      <form onSubmit={handleLogin} className={classes.form}>
        <h3>Login</h3>
        <div className={classes.inpCtn}>
          <label>Email</label>
          <input
            type="email"
            placeholder="johndoe@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.inpCtn}>
          <label>Password</label>
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" className={classes.button} />
        <p>
          Don't have an account?{" "}
          <Link
            href="/register"
            style={{ textDecoration: "none", color: "#0B60B0" }}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
