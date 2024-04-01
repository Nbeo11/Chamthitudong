/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

export const userLogin = async (email, password) => {
    try {
        const response = await axios.post(`${API_ENDPOINTS.AUTH}/login`, {
            email: email,
            password: password
        });
        return response.data;
    } catch (error) {
        throw new Error('Error logging in:', error);
    }
}


