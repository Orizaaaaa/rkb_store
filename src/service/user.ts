import { axiosInterceptor } from "./axiosInterceptor"

export const getAllUser = (callback: any) => {
    axiosInterceptor.get('/users/list')
        .then((res) => {
            callback(res.data);
        })
        .catch((error) => {
            console.error("Error fetching all user", error);
        });
}
