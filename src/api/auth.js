/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

export const userLogin = async (data) => {
    const response = await axios.post(`${API_ENDPOINTS.AUTH}/login`, {data});
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updatePassword = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.AUTH}/updatePassword/${_id}`, {data
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
