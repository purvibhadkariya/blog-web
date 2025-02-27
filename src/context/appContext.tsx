import { IUser } from "@/models/models";
import { createContext } from "react";


interface AppContextType {
    showAlert: (data:any) => void,
    user: IUser,
    theme: any, 
    toggle: () => void,
    isAuthenticated:boolean,
    updateUser: (user:IUser) => void,
    logOut:() => void
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

