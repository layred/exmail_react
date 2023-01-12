import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-auto h-auto bg-gray-800 p-8 flex flex-col shadow-2xl rounded-3xl">
                <h1 className="text-center text-white">Упс! Такой страницы нет.</h1>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded m-auto"><Link to="/dashboard">Перейти на главную</Link></button>
            </div>
        </div>
    );
}
