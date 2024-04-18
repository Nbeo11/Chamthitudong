/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";


export const createGrade = async (data) => {
    const response = await axios.post(API_ENDPOINTS.GRADES, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getGradedetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.GRADES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateGrade = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.GRADES}/${_id}`,data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteGrade = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.GRADES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getGradebyOlogyId = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.GRADES}/${_id}/grades`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getAllGrade = async () => {
    const response = await axios.get(`${API_ENDPOINTS.GRADES}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getAllbyCourseandOlogyId = async (courseId, ologyId) => {
    const response = await axios.get(`${API_ENDPOINTS.STUDENTCODES}/courseandology/${courseId}/${ologyId}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
