import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const register = (params) => {
    if(params['type'] === 'LTO') {
        return axios.post(API_URL + "/lto/signup", params);
    } else if(params['type'] === 'RPF') {
        return axios.post(API_URL + "/rpf/signup", params);
    }else {
        return axios.post(API_URL + "/signup", params);
    }
};

const verifyEmail = (email, code, type) => {
    if(type === 'LTO') {
        return axios.post(API_URL + "/lto/signup/verify-code", {email, code});
    } else if(type === 'RPF'){
        return axios.post(API_URL + "/rpf/signup/verify-code", {email, code});
    }
    else {
        return axios.post(API_URL + "/signup/verify-code", {email, code});
    }
};

const reSendVerificationCode = (email) => {
    return axios.post(API_URL + "/resend-verification-code", {email});
};

const login = (email, password) => {
    return axios.post(API_URL + "/signin", {email, password});
};

const logout = () => {
    localStorage.removeItem("user");
};

const forgotPassword = (email) => {
    return axios.post(API_URL + "/reset-password", {email});
};

const resetPassword = (email, password, code) => {
    return axios.post(API_URL + "/reset-password/verify-code", {email, password, code});
};

const authenticate = (data) => {
    return axios.post(API_URL + "/authenticate", {}, {
      headers: authHeader(),
    });
  };

export default {
    register,
    verifyEmail,
    reSendVerificationCode,
    login,
    logout,
    forgotPassword,
    resetPassword,
    authenticate
};
