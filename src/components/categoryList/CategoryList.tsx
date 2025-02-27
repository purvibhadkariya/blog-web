import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const CategoryList = async () => {
  const data = [ 
    {
      title:"coding",
      slug:"coding",
      img: "/coding.png"
    },
    {
      title:"culture",
      slug:"culture",
      img: "/culture.png"
    },
    {
      title:"fashion",
      slug:"fashion",
      img: "/fashion.png"
    },
    {
      title:"food",
      slug:"food",
      img: "/food.png"
    },
    {
      title:"style",
      slug:"style",
      img: "/coding.png"
    },
    {
      title:"travel",
      slug:"travel",
      img: "/travel.png"
    },
   ] as any;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item:any, index:number) => (
          <Link
            href={`/?cat=${item.title}`}
            className={`${styles.category} ${styles[item.slug]}`}
            key={index}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
