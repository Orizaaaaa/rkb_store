import axios from "axios"
import { url } from "./auth";

export const statusDashboard = (callback: any) => {
    axios.get(`${url}/dashboard/summary`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}

export const coordinateDashboard = (callback: any) => {
    axios.get(`${url}/dashboard/coordinates`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}

export const getDataPerMonth = (callback: any) => {
    axios.get(`${url}/dashboard/total-transactions-per-month`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}