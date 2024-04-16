/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";


export const createCompile = async (data) => {
    const response = await axios.post(API_ENDPOINTS.COMPILES, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
