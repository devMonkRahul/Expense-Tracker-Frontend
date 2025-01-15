import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../utils/Popup/ErrorPopup/ErrorPopup";
import config from "../conf/config"
import { setError, logout } from "../store/features/authSlice";
import { useDispatch } from "react-redux";

const domain = config.domain;

export const usePost = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const postRequest = async (url, body, token = null) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${domain}${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(body)
            });

            const json = await response.json().catch(() => ({}));
            const { success, message } = json;

            if (!response.ok) {
                if (response.status === 401 || message === "jwt expired" || message === "jwt malformed") {
                    dispatch(logout());
                    dispatch(setError("Session expired. Please login again."));
                    navigate('/');
                }
                throw new Error(
                    (message ? message : response.statusText) || "An error occurred"
                );
            }
            
            if (!success) {
                dispatch(setError(message || "An error occurred"));
                throw new Error(message || "An error occurred");
            }

            return json;
        } catch (error) {

            if (error.message === "jwt expired" || error.message === "jwt malformed") {
                dispatch(logout());
                dispatch(setError("Session expired. Please login again."));
                navigate('/');
            }
            console.error(error);

            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return { postRequest, isLoading };
}