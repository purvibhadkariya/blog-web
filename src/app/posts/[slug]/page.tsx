import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import { getPostDetails } from "@/services/endpoint.service";

export const formatDate = (dateString: string) => {
  const options: any = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const SinglePage = async (params:{ params:{ slug: string } }) => {
  const { slug } = params.params;
  let data = {} as any;

  try {
    data = (await getPostDetails(slug)).data.data
  } catch (error:any) {
    console.log(error.message)
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.blog?.author?.profile && (
              <div className={styles.userImageContainer}>
                <Image src={process.env.NEXT_PUBLIC_API_URL+"/" + data?.blog?.author?.profile.url} alt="" fill className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.blog?.author.userName}</span>
              <span className={styles.date}>{formatDate(data?.blog.createdAt)}</span>
            </div>
          </div>
        </div>
        {data?.blog?.heroImg && (
          <div className={styles.imageContainer}>
            <Image src={process.env.NEXT_PUBLIC_API_URL+"/" + data?.blog.heroImg.url} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.blog.description }}
          />
          <div className={styles.comment}>
            <Comments blogId={data.blog._id} comments={data.comments}/>
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
