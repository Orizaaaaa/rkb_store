import { axiosInterceptor } from "./axiosInterceptor";

export const createReport = async (formUnitWork: any, callback: any) => {
    await axiosInterceptor.post('/reports', formUnitWork)
        .then((result) => {
            callback(true, result.data)
        }).catch((err: any) => {
            console.log(false, err);
        });
}


export const getAllProduct = (callback: any) => {
    //kalo error tambah utl api aja
    axiosInterceptor.get('/products/list')
        .then((res) => {
            callback(res.data);
        })
        .catch((error) => {
            console.error("Error fetching all product", error);
        });
}

export const getDetailProduct = (id: string, callback: any) => {
    axiosInterceptor.get(`/products/${id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((error) => {
            console.error("Error fetching get product by id", error);
        });
}



export const deleteProduct = async (id: any, callback: any) => {
    await axiosInterceptor.delete(`/products/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}