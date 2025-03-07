"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/appContext";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logOut } = useContext(AppContext);

  return (
    <>
      {!isAuthenticated? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span className={styles.link} onClick={logOut}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          {/* <Link href="/">About</Link>
          <Link href="/">Contact</Link> */}
          {status === "notauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span className={styles.link}>Logout</span>
              <Link href="/">Logout</Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
