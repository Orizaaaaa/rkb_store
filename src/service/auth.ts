import axios from "axios";

export const url = import.meta.env.VITE_BASE_API
export const cloudName = import.meta.env.VITE_CLOUDINARY_NAME
export const cloudApiKey = import.meta.env.VITE_CLOUDINARY_API_KEY
export const cloudApiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET

export const loginService = async (formLogin: any, callback: any) => {
    await axios.post(`${url}/users/login`, formLogin)
        .then((res) => {
            callback(true, res.data);
        }).catch((err) => {
            callback(false, err)
        })
}

export const register = async (formRegister: any, callback: any) => {
    await axios.post(`${url}/users/register`, formRegister)
        .then((res) => {
            callback(true, res.data);
            console.log(res.data);

        }).catch((err) => {
            callback(false, err);
        });
};
