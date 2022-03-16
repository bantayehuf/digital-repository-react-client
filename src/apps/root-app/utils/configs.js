import axios from "axios";
import {
  BASE_API_URL,
} from "./constant_values";

import {
  loginInfo
} from "./auth";

const API = axios.create({
  baseURL: BASE_API_URL,
  timeout: 20000, // timeout 20 seconds
  headers: {
    common: {
      Authorization: `Bearer ${loginInfo().AUTH_TOKEN}`,
    },
  },
});

export {
  API,
};