// lib/axios.js
import axios from "axios"; // ← this line was missing

const instance = axios.create({
withCredentials: true, // send cookies automatically
});

export default instance;
