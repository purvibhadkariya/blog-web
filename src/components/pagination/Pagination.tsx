"use client";

import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

const Pagination = (props:{ page:any, hasPrev:boolean, hasNext:boolean, callback: Function }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button className={styles.button} disabled={!props.hasPrev} onClick={() => props.callback()} >
        Previous
      </button>
      <button disabled={!props.hasNext} className={styles.button} onClick={() => props.callback(true)} >
        Next
      </button>
    </div>
  );
};

export default Pagination;
