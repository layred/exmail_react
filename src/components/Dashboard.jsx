import React from 'react';
import { useUser } from '../lib/customHooks';

const Dashboard = () => {
    const { user, authenticated } = useUser();
    if (!user || !authenticated) {
        return <div className="w-full h-screen flex justify-center items-center">
            <div className="ml-2 w-8 h-8 border-l-2 rounded-full animate-spin border-black" />
        </div>;
    }

    return (
        <div className="p-8 bg-grey-100 h-screen w-screen">
            <div className="text-2xl mb-4 font-bold text-black">Главная</div>
            {
                user &&
                <div className='text-black'>
                    <div className="text-lg text-bold mb-2">Данные пользователя</div>
                    <div className="flex">
                        <div className="w-24 font-medium">
                            <div> Почта : </div>
                            <div> Имя : </div>
                        </div>
                        <div>
                            <div> {user.email_adress} </div>
                            <div> {user.first_name} </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Dashboard;