import axios from "axios"
import { url } from "./auth"
import { axiosInterceptor } from "./axiosInterceptor";

export const getCategories = (callback: any) => {
    axios.get(`${url}/categories/list`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);

        });
}

export const deleteCategory = (id: any, callback: any) => {
    axiosInterceptor.delete(`/categories/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}

export const createCategory = async (form: any, callback: any) => {
    await axiosInterceptor.post('/categories', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}