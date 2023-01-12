import { API_ROUTES } from '../utils/constants';
import axios from 'axios';

export function storeTokenInLocalStorage(token) {
  localStorage.setItem('token', token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return defaultReturnObject;
    }
    const response = await axios({
      method: 'POST',
      url: API_ROUTES.SANCTUM_USER,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { authenticated = false } = response.data;
    return authenticated ? response.data : false;
  }
  catch (err) {
    console.log('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}

export const parseCode = (code) => {
  const route = +('' + code).substring(0, 1);
  const payload = '' + parseInt(code.substring(1));
  const id = +payload.substring(0, payload.length - 1);

  if (code.length === 14 || code.length === 18) {
    console.debug({ route, payload, id: code });

    return { route, payload, id: code }
  }

  console.debug({ route, payload, id });

  if (code.length === 14) {
    return { route, payload, id: code }
  }

  return { route, payload, id };
}
