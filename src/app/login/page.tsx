"use client";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/appContext";
import { AUTH_TYPE, LOCALSTORAGE_KEYS } from "@/models/enums";
import { login, signup } from "@/services/endpoint.service";
import Image from "next/image";

const LoginPage = () => {
	const router = useRouter();
	const [authType, setAuthType] = useState('');
	const { updateUser, showAlert } = useContext(AppContext)
	const [imageSrc, setImageSrc] = useState('');
	const [media, setFile] = useState<any>();
 	const [formData, setFormData] = useState({
		userName: '',
		emailId: '',
		password: ''
	})

	useEffect(()=>{
		setAuthType(AUTH_TYPE.SIGNUP);
	},[])

	useEffect(()=>{
		const token = localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN);
		if(token){
			router.push("/")
		}
	},[])

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


	const storeInputValue = (event: any) => setFormData({ ...formData, [event.target.name]: event.target.value })

	const submit = async ()   =>{
		if(authType === AUTH_TYPE.SIGNUP){
			if(formData.emailId && formData.userName && formData.password && imageSrc){
				const form =  new FormData();
				form.append("data", JSON.stringify({
					emailId: formData.emailId, 
					userName: formData.userName, 
					password: formData.password
				}))
				form.append('photo',media);
				const config: any = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				  }
				const response = await signup(form,config);
				if(response.data.success === true){
					const user = response.data.data.user;
					// updateing the user details in the context
					updateUser({ userName: user.userName, emailId: user.emailId, refreshToken: response.data.data.refreshToken, token: response.data.data.token })
					showAlert({ message: "User Registered Successfully", type: "success", show: true })
					router.push("/")
				}else{
					showAlert({ message: response.data.message, type: "error", show: true })
				}
			}else{
				showAlert({ message: "Please fill all required Data", type: "error", show: true })
			}
		}else{
			if(formData.emailId && formData.password){
				const response = await login({emailId: formData.emailId, password: formData.password});
				if(response.data.success === true){
					const user = response.data.data.user;
					// updateing the user details in the context
					updateUser({ userName: user.userName, emailId: user.emailId, refreshToken: response.data.data.refreshToken, token: response.data.data.token })
					showAlert({ message: "Login Success", type: "success", show: true })
					router.push("/")
				}else{
					showAlert({ message: response.data.message, type: "error", show: true })
				}
			}else{
				showAlert({ message: "Please fill all required Data", type: "error", show: true })
			}
		}
	}



	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.heading}>
					{ authType === AUTH_TYPE.LOGIN ? AUTH_TYPE.LOGIN : AUTH_TYPE.SIGNUP }
				</div>

				<div className={styles.form_wrapper}>
					{
						authType == AUTH_TYPE.SIGNUP ?
							<>
							{ imageSrc && <Image className={styles.previewImg} alt="none" src={imageSrc} width={400} height={220} /> }
								<div className={styles.input_wrapper}>
									<p className={styles.input_title}>Photo</p>
									<div className={styles.input_container}>
										<input type="file" name="photo" className={styles.Img} onChange={(e:any) => {setFile(e.target.files[0]); handleImageUpload(e)}} />
									</div>
								</div>
							</>
						 : ''
					}
					<div className={styles.input_wrapper}>
						<p className={styles.input_title}>EmailId</p>
						<div className={styles.input_container}>
							<input type="emaildId" name="emailId" className={styles.input_box} placeholder="Enter your Email ID" onChange={storeInputValue} />
						</div>
					</div>
						
					{
						authType === AUTH_TYPE.SIGNUP ? 
							<div className={styles.input_wrapper}>
								<p className={styles.input_title}>Username</p>
								<div className={styles.input_container}>
									<input type="text" name="userName" className={styles.input_box} placeholder="Enter your Username" onChange={storeInputValue} />
								</div>
							</div>
						: ''
					}

					<div className={styles.input_wrapper}>
						<p className={styles.input_title}>Password</p>
						<div className={styles.input_container}>
							<input type="password" name="password" className={styles.input_box} placeholder="*******" onChange={storeInputValue} />
						</div>
					</div>
				</div>

				<div className={styles.socialButton} onClick={submit}>
					{  authType === AUTH_TYPE.SIGNUP ? AUTH_TYPE.SIGNUP : AUTH_TYPE.LOGIN }
				</div>

				
                <p className={styles.new_user} onClick={ () => setAuthType((auth:string)=> auth === AUTH_TYPE.LOGIN ? AUTH_TYPE.SIGNUP : AUTH_TYPE.LOGIN)} >
					{authType === AUTH_TYPE.SIGNUP ? 'Already Registered?' : 'New user?'}
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
