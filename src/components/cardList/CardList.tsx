'use client'

import React, { useContext, useEffect, useState } from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import { getBlogs } from "@/services/endpoint.service";
import { IHeaders } from "@/models/models";
import { useSearchParams } from "next/navigation";
import { AppContext } from "@/context/appContext";

const CardList = (props:{ page:any, cat?:any }) => {
  // const { posts, count } = await getData(props.page, props.cat);
  const searchParams = useSearchParams();
  const { showAlert} = useContext(AppContext);
  const [posts, setPost] = useState<any>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [category, setCategory] = useState<any>('')
  const [loading, setLoadingPosts] = useState<boolean>(true);

    useEffect(() => {
        setCategory(searchParams.get('cat'))
    }, [searchParams.get('cat')])

  const limit = 4


  const setIntialPosts = (response: any, getInitial: boolean, isNext:boolean) => {
    if (response.success === true) {
        if (getInitial) {
            setPost(response.data)
        } else {
            setPost((data: any) => [...response.data])
            if(isNext){
              setOffset((value) => value + limit);
            }else{
              setOffset((value)=> value-limit)
            }
        }
        if (response.data.length > limit - 1) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
    }
  }

  useEffect(()=>{
    const getAllThreads = async () => {
        setLoadingPosts(true);
        const response = await getBlogs(offset,category ? category : undefined);
        setIntialPosts(response.data, true,true);
        setLoadingPosts(false);
    }
    getAllThreads()
  },[category])

  const getNextPrevThreads = async (isNext?:boolean) =>{
    if(isNext){
      if(hasMore){
        setLoadingPosts(true);
        const response = await getBlogs(offset + limit,category ? category : undefined);
        setIntialPosts(response.data,false,true);
        setLoadingPosts(false);
      }else{
        showAlert({ message: "Something went wrong. try refreshing", type: "error", show: true })
      }
    }else{
      if(offset < limit){
        showAlert({ message: "No previous threads available", type: "error", show: true })
      }else{
        setLoadingPosts(true);
        const response = await getBlogs(offset-limit,category ? category : undefined);
        setIntialPosts(response.data,false,false);
        setLoadingPosts(false);
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item:any,index:number) => (
          <Card item={item} key={index} />
        ))}
      </div>
      <Pagination callback={getNextPrevThreads} page={props.page} hasPrev={offset != 0 ? true: false} hasNext={hasMore} />
    </div>
  );
};

export default CardList;
