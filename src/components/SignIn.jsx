import React from 'react';
import { useState } from 'react';
import { APP_ROUTES } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../lib/customHooks';
import { storeTokenInLocalStorage } from '../lib/common';
import { toast } from 'react-toastify';
import { authentication, getAuthUser } from '../api/client'

const SignIn = () => {
    const navigate = useNavigate();
    const { user, authenticated } = useUser();
    if (user || authenticated) {
        navigate(APP_ROUTES.DASHBOARD)
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async () => {
        try {
            setIsLoading(true);
            const response = authentication({
                email_adress: email,
                password: password,
                remember: true
            }).then(function (response) {
                storeTokenInLocalStorage(response.data.token)
                getAuthUser().catch((error) => toast.error("Неверные логин или пароль"))
                navigate(APP_ROUTES.DASHBOARD)
            })
            .catch((error) => toast.error("Неверные логин или пароль"))
            storeTokenInLocalStorage(response.data.token);
        }
        catch (err) {
            toast.error('Some error occured during signing in: ', err);
        }
        finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-800">
            <div className="w-1/3 h-auto shadow-lg rounded-md bg-white p-8 flex flex-col">
                <h2 className="text-center font-medium text-2xl mb-4">
                    Вход
                </h2>
                <div className="flex flex-1 flex-col justify-evenly">
                    <input
                        className="border-2 outline-none p-2 rounded-md my-2"
                        type="email"
                        placeholder="Введите почту от exmail"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }}
                    />
                    <input
                        className="border-2 outline-none p-2 rounded-md my-2"
                        type="password"
                        placeholder="*******" value={password}
                        onChange={(e) => { setPassword(e.target.value); }}
                    />

                    <button
                        className="flex justify-center p-2 rounded-md w-1/2 self-center bg-gray-800  text-white hover:bg-gray-800"
                        onClick={signIn}>
                        {
                            isLoading ?
                                <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
                        }
                        <span>
                            Войти
                        </span>
                    </button>
                </div>
            </div>
        </div >
    );
}

export default SignIn;