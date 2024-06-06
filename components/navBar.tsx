import React, { useContext } from "react";
import classes from "@/styles/navBar.module.css";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "@/context/auth";

const NaveBar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className={classes.main}>
      <h4>Manage Task</h4>
      <button onClick={() => logout()} className={classes.button}>
        <FiLogOut />
      </button>
    </div>
  );
};

export default NaveBar;
