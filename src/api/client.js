import axios from "axios";
import { toast } from "react-toastify";
import { API_ROUTES, API_URL } from '../utils/constants';


const client = axios.create({
	baseURL: API_URL,
	mode: 'no-cors',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
	credentials: 'same-origin',
});

client.interceptors.request.use((config) => {
	let token = localStorage.getItem("token") || sessionStorage.getItem("token");

	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}

	return config;
});

client.interceptors.response.use((config) => { return config; }, (error) => {

	if (error.response.status === 401) {
		toast.error("Произошла ошибка, попробуйте позже")
	}

	return Promise.reject(error);
});


async function authentication(user) {
	return await client.post(API_ROUTES.SANCTUM_TOKEN, user);
}
async function restore(user) {
	return await client.post("/sanctum/restore", user);
}
async function getAuthUser() {
	return await client.post(API_ROUTES.SANCTUM_USER);
}

export { authentication, restore, getAuthUser, client };