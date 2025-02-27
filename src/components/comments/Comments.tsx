"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import { useContext, useState } from "react";
import { AppContext } from "@/context/appContext";
import { IHeaders } from "@/models/models";
import { LOCALSTORAGE_KEYS } from "@/models/enums";
import { addComment } from "@/services/endpoint.service";


const Comments = (props:{ comments:any, blogId: any }) => {

  const { isAuthenticated, showAlert,user } = useContext(AppContext)
  const [ commentList, setCommentList ] = useState(props.comments);
  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN);
    if(!token){
      showAlert({ message: "Unathorized User", type: "error", show: true })
    }
    const config: IHeaders = {
      headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
    }
    const response = await addComment(desc,props.blogId, config);
    if(response.data.success === true){
      showAlert({ message: "Comment added successfully", type: "success", show: true })
      if(user){
        const resComment = response.data.data
        console.log({
          blog: resComment.blog,
          createdAt: resComment.createdAt,
          message: resComment.message,
          user: user,
          _id:resComment._id
        })
        setCommentList((data:any)=> [{
          comment: {
            blog: resComment.blog,
            createdAt: resComment.createdAt,
            message: resComment.message,
            user: user,
            _id:resComment._id
          }
        },...data])
      }
    }else{
      showAlert({ message: "Failed to add Comment", type: "error", show: true })
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {isAuthenticated? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {commentList.map((item:any, index:number) => {
          return(
            <div className={styles.comment} key={index}>
              <div className={styles.user}>
                {item.comment?.user?.profile && (
                  <Image
                    src={process.env.NEXT_PUBLIC_API_URL+"/" + item.comment.user.profile.url}
                    alt=""
                    width={50}
                    height={50}
                    className={styles.image}
                  />
                )}
                <div className={styles.userInfo}>
                  <span className={styles.username}>{item.comment.user?.userName}</span>
                  <span className={styles.date}>{item.comment.createdAt}</span>
                </div>
              </div>
              <p className={styles.desc}>{item.comment.message}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Comments;
