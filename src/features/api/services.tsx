import axios from "axios";
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

export const getApiResult = async (path: string) => {
    try {
        const res = await axios.get(`${API_URL}${path}`,         
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data.data
    } catch (err) {
        toast.error("ارتباط با سرور ناموفق بود")
        return []
    }
}
export const getApiResultById = async (path: string, id: number) => {
    try {
        const res = await axios.get(`${API_URL}${path}/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data.data
    } catch (err) {
        toast.error("ارتباط با سرور ناموفق بود")
        return []
    }
}