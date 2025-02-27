import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

const Card = (props:{ item:any }) => {
  return (
    <div className={styles.container}>
      {/* {props.item.heroImg ? ( */}
        <div className={styles.imageContainer}>
          <Image src={process.env.NEXT_PUBLIC_API_URL+"/" + props.item.heroImg.url} alt="" fill className={styles.image} />
        </div>
      {/* ): " nooo"} */}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {props.item.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className={styles.category}>{props.item.category}</span>
        </div>
        <Link href={`/posts/${props.item.slug}`}>
          <h1>{props.item.title}</h1>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: props.item?.description.substring(0,60) }}/>
        <Link href={`/posts/${props.item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
