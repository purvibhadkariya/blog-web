export interface IToast {
    type: string,
    message: string,
    show?: boolean
}

export interface IUser {
    _id?: string,
    userName?: string,
    emailId?: string,
    token?: string,
    refreshToken?: string,
    password?: string,
    profile?: string
}

export interface IBlog {
    title:string,
    description: string,
    category: string,
    slug: string,
    heroImg: string,
}


export interface IHeaders {
    headers:{
        Authorization:string,
        'Content-Type':string
    }
}