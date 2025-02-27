"use client"

import { useEffect, useState } from "react";
import { AppContext } from "./appContext";
import Toast from "../components/toast/toast";
import { useRouter } from "next/navigation";
import { IHeaders, IToast, IUser } from "@/models/models";
import { LOCALSTORAGE_KEYS } from "@/models/enums";
import { userDetails } from "@/services/endpoint.service";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [isAuthenticated, setisAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>();
    const [showtoast, setShowToast] = useState<IToast>({ message: "", type: "", show: false });
    const router = useRouter();
    const [theme, setTheme] = useState('dark');
    
    const toggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    
    useEffect(() => {
        localStorage.setItem("theme", theme as string);
    }, [theme]);

    useEffect(() =>{
        const token = localStorage.getItem(LOCALSTORAGE_KEYS.TOKEN);
        if(token){
            const getUserDetails = async () =>{
                const config: IHeaders = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }
                const response:any = await userDetails(config);
                if (response.data.success === true) {
                    const userData = response.data.data;
                    setUser({
                        _id: userData._id,
                        userName: userData.userName,
                        emailId: userData.emailId,
                        profile: userData?.profile,
                    })
                    setisAuthenticated(true)
                } else {
                    logOut();
                }
            }
            getUserDetails()
            
        }
    },[])

    const showAlert = (data: IToast) => {
        setShowToast({ ...data, show: true })
        setTimeout(() => {
            setShowToast({ message: "", type: "", show: false })
        }, 3000)
    }
    

    const updateUser = (data: IUser) => {
        setUser(data);
        setisAuthenticated(true);
        localStorage.setItem(LOCALSTORAGE_KEYS.TOKEN, data.token as string);
        localStorage.setItem(LOCALSTORAGE_KEYS.REFRESHTOKEN, data.refreshToken as string);
    }

    const logOut = () => {
        setUser(undefined)
        setisAuthenticated(false);
        localStorage.removeItem(LOCALSTORAGE_KEYS.TOKEN)
        localStorage.removeItem(LOCALSTORAGE_KEYS.REFRESHTOKEN)
        router.push('/login')
    }


    const appContext: any = {
        user,
        theme, 
        toggle,
        isAuthenticated,
        showAlert,
        updateUser,
        logOut
    };


    return (
        <AppContext.Provider value={appContext}>
            <div className={theme}>
                <div style={{ position: 'relative' }}>
                    {
                        showtoast.show && <Toast type={showtoast?.type} message={showtoast?.message} />
                    }
                        {children}
                </div>
            </div>
        </AppContext.Provider>
    )
}