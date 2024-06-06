import { AuthContext } from "@/context/auth";
import Link from "next/link";
import React, { useContext } from "react";
import classes from "@/styles/home.module.css";
import { RxExternalLink } from "react-icons/rx";

const Home = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  return (
    <div className={classes.main}>
      <div className={classes.content}>
        WELCOME TO TASK MANAGEMENT APPLICATION
        {isAuthenticated ? (
          <>
            <Link href="/tasks">
              View Tasks <RxExternalLink />{" "}
            </Link>
            <p>
              Not {user?.name}? <button onClick={() => logout()}>logout</button>
            </p>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Home;
