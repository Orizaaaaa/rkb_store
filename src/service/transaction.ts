import { axiosInterceptor } from "./axiosInterceptor";

export const getAllTransaction = (callback: any) => {
    axiosInterceptor.get(`/transactions/list`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}
export const getDetailTransaction = (id: string, callback: any) => {
    axiosInterceptor.get(`/transactions/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}


export const createTransaction = async (form: any, callback: any) => {
    await axiosInterceptor.post('/transactions/create', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}
export const getTransactionByUser = async (id: string, callback: any) => {
    await axiosInterceptor.get(`/transactions/user/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}