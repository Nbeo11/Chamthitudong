import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

export const getCoursedetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.FACULTIES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateCourse = async (_id) => {
    const response = await axios.put(`${API_ENDPOINTS.FACULTIES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteCourse = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.FACULTIES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
