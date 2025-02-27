"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import { LOCALSTORAGE_KEYS } from "@/models/enums";
import { IHeaders } from "@/models/models";
import { AppContext } from "@/context/appContext";
import { addBlog } from "@/services/endpoint.service";

const WritePage = () => {
  const router = useRouter();
  const [media, setFile] = useState<any>();
  const { showAlert } = useContext(AppContext)
  const [value, setValue] = useState("");
  const [catSlug, setCatSlug] = useState("style");
	const [imageSrc, setImageSrc] = useState('');
  const [title, setTitle] = useState('');

  useEffect(()=>{
    const token = localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN);
    if(!token){
      router.push("/login")
    }
  },[])

  const handleTitleChange = (event:any) => {
    setTitle(event.target.value);
  };
  
  const slugify = (str:string) => {
    return str.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");}

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFile(file)
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageSrc(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

  const handleSubmit = async () => {

    const token = localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN);
    if(!token){
      showAlert({ message: "Unathorized User", type: "error", show: true })
    }

    const formData =  new FormData();
    formData.append("data", JSON.stringify({
      title:title,
      description: value,
      category: catSlug,
      slug: slugify(title)
    }))
    formData.append('heroImg',media);

    const config: IHeaders = {
      headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
      }
    }

    const response = await addBlog(formData,config);
    if(response.data.success === true){

      router.push(`/posts/${response.data.data.slug}`)
    }else{
      showAlert({ message: "Unable to Add Blog", type: "error", show: true })
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={handleTitleChange}
      />
      <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <div className={styles.imageWrapper}>
        { imageSrc && <Image className={styles.previewImg} alt="none" src={imageSrc} width={400} height={220} /> }
        <input
          type="file"
          className={styles.Img}
          id="image"
          onChange={(e:any) => {setFile(e.target.files[0]); handleImageUpload(e)}}
        />
      </div>
      <div className={styles.editor}>
        <ReactQuill
          className={styles.textArea}
          theme="snow"
          value={value}
          onChange={setValue}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          }}
          formats={[
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet',
            'link', 'image',
          ]}
          placeholder="Tell your story..."
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;