import { AuthContext } from "@/context/auth";
import React, { useContext, useState } from "react";
import classes from "@/styles/login.module.css";
import Link from "next/link";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);

  const handleRegister: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("email and password should not be empty!");
      return;
    }

    register({ name, email, password });
  };

  return (
    <div className={classes.main}>
      <form onSubmit={handleRegister} className={classes.form}>
        <h3>Register</h3>
        <div className={classes.inpCtn}>
          <label>Name</label>
          <input
            placeholder="john doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" className={classes.button} />
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ textDecoration: "none", color: "#0B60B0" }}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
