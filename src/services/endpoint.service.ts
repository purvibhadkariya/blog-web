import { IHeaders, IUser } from "@/models/models"
import axios from "axios"

export const signup = (data: any, headers: any) => {
    return axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/signup/', data, headers)
}

export const login = async (data: IUser) => {
    return axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/login', data)
}

export const addBlog = async (data: any, headers: any) => {
    return axios.post(process.env.NEXT_PUBLIC_API_URL + '/blogs/create-blog', data, headers)
}

export const getBlogs = async (offset: number, category: string) => {
    return axios.get(process.env.NEXT_PUBLIC_API_URL + `/public/home?offset=${offset}&category=${category}`,)
}

export const getPostDetails = async (slug: string) => {
    return axios.get(process.env.NEXT_PUBLIC_API_URL + `/public/home/blog?slug=${slug}`, )
}

export const addComment =async (message:string, blogId: string, headers: any,replyId?: string) => {
    return axios.post(process.env.NEXT_PUBLIC_API_URL + '/blogs/add-comment', { message, replyId, blogId }, headers)
}

export const userDetails = async (headers: IHeaders) => {
    return axios.get(process.env.NEXT_PUBLIC_API_URL + '/blogs/user-details', headers)
}