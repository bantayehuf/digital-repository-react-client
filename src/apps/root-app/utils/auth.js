import axios from "axios";
import {
    SERVER_ASSDRESS
} from "./constant_values"

const AUTH_BASE_API_URL = `${SERVER_ASSDRESS}/auth`;
const LOGIN_INFO_LOCAL_STORAGE_INDEX = "login-info";

const AUTH_API = axios.create({
    baseURL: AUTH_BASE_API_URL,
    timeout: 20000, // timeout 20 seconds
    headers: {
        common: {
            "Content-Type": "application/json",
        },
    },
});

const loginInfo = () => {
    // Get access token from local storage.
    const LOGIN_INFO = localStorage.getItem(LOGIN_INFO_LOCAL_STORAGE_INDEX) ?
        JSON.parse(localStorage.getItem(LOGIN_INFO_LOCAL_STORAGE_INDEX)) : {};

    const AUTH_TOKEN = LOGIN_INFO.access ? LOGIN_INFO.access : "";

    return {
        LOGIN_INFO: LOGIN_INFO,
        AUTH_TOKEN: AUTH_TOKEN,
        USER_LOGIN_INFO: LOGIN_INFO.user_info
    };
};

const hasPermission = (roles) => {
    /**
     * Checking user permission from local storage
     */
    const login = loginInfo();

    if (!login.LOGIN_INFO.user_role) return false;

    return roles.includes(login.LOGIN_INFO.user_role);
};

const validateToken = async (roles) => {
    /**
     * validateToken() function is used to validate a user permission before,
     * perform the requested actions
     */

    // Checking user permission from localstorage, which is saved durig login
    if (!hasPermission(roles)) return false;

    const login = loginInfo();

    /**
     * Verifying access token and a user role that has stored in local storage
     * Access token shoud be sent in header as Authorization Bearer token and
     * user role in a request body.
     */
    let verified = false;
    try {
        const response = await AUTH_API.post(
            "/token-verify", {
                user_role: login.LOGIN_INFO.user_role,
            }, {
                headers: {
                    Authorization: `Bearer ${loginInfo().AUTH_TOKEN}`,
                },
            }
        );
        if (response.status === 200) {
            verified = true;
        } else {
            throw new Error("Invalid user!");
        }
    } catch (error) {}

    return verified;
};

const logoutUser = (url = "/login") => {
    const login = loginInfo();

    if (login.LOGIN_INFO) {
        localStorage.removeItem(LOGIN_INFO_LOCAL_STORAGE_INDEX);
    }
    window.location.assign(url);
};

export {
    AUTH_BASE_API_URL,
    AUTH_API,
    LOGIN_INFO_LOCAL_STORAGE_INDEX,
    loginInfo,
    validateToken,
    hasPermission,
    logoutUser,
};