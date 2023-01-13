import { useEffect } from 'react';
import { useUser } from '../../lib/customHooks';

const Dashboard = () => {
    const { user } = useUser();

    useEffect(() => {
        document.title = "Главная";
    });

    return (
        <div className="p-8 bg-grey-100">
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