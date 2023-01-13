import { Outlet } from "react-router-dom";
import { useUser } from '../lib/customHooks';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HomeIcon, InboxStackIcon, RocketLaunchIcon, PaperAirplaneIcon, BugAntIcon, ArrowLeftOnRectangleIcon, MagnifyingGlassIcon, HomeModernIcon } from '@heroicons/react/24/outline'
import { ReactComponent as LogoImage } from '../assets/logo.svg'

const Wrapper = () => {
    const navigate = useNavigate();
    const { user, authenticated } = useUser();
    if (!user || !authenticated) {
        navigate('/signin')
    }

    return (
        <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
            <aside class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-indigo-400">
                <div class="sidebar-header flex items-center justify-center py-4">
                    <div class="inline-flex">
                        <Link to={`/`} class="inline-flex flex-row items-center">
                            <LogoImage className="w-full m-auto"/>
                            {/* <HomeModernIcon className="w-10 h-10 text-white" />
                            <span class="leading-10 text-white text-2xl font-bold ml-1 uppercase">Exmail</span> */}
                        </Link>
                    </div>
                </div>
                <div class="sidebar-content px-4 py-3">
                    <ul class="flex flex-col w-full">
                        <li class="my-px">
                            <Link to={`/dashboard`} class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-gray-100 hover:text-gray-700 transition-colors">
                                <span class="flex items-center justify-center text-lg">
                                    <HomeIcon className="h-5 w-5" />
                                </span>
                                <span class="ml-3 text-sm whitespace-nowrap">Главная</span>
                            </Link>
                        </li>
                        <li class="my-px">
                            <Link to={`/shipments`} class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-gray-100 hover:text-gray-800 transition-colors">
                                <span class="flex items-center justify-center text-lg">
                                    <InboxStackIcon className="h-5 w-5" />
                                </span>
                                <span class="ml-3 text-sm whitespace-nowrap">Отправления</span>
                            </Link>
                        </li>
                        <li class="my-px">
                            <Link to={`/sendings`} class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-gray-100 hover:text-gray-700 transition-colors">
                                <span class="flex items-center justify-center text-lg">
                                    <RocketLaunchIcon className="h-5 w-5" />
                                </span>
                                <span class="ml-3 text-sm whitespace-nowrap">Отправка</span>
                            </Link>
                        </li>
                        <li class="my-px">
                            <Link to={`/freights`} class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-gray-100 hover:text-gray-700 transition-colors">
                                <span class="flex items-center justify-center text-lg">
                                    <PaperAirplaneIcon className="h-5 w-5" />
                                </span>
                                <span class="ml-3 text-sm whitespace-nowrap">Перевозки</span>
                                {/* <span class="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">1k</span> */}
                            </Link>
                        </li>
                        <li class="my-px">
                            <Link to={`/admin`} class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-gray-100 hover:text-gray-700 transition-colors">
                                <span class="flex items-center justify-center text-lg text-green-400">
                                    <BugAntIcon className="h-5 w-5" />
                                </span>
                                <span class="ml-3 text-sm whitespace-nowrap">Админ панель</span>
                            </Link>
                        </li>
                        <li class="my-px">
                            <Link to={`/logout`} class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-gray-100 hover:text-gray-700 transition-colors">
                                <span class="flex items-center justify-center text-lg text-red-400">
                                    <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                                </span>
                                <span class="ml-3 text-sm whitespace-nowrap">Выйти</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
            <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                <header class="header bg-white shadow py-4 px-4">
                    <div class="header-content flex items-center flex-row">
                        <form action="#">
                            <div class="hidden md:flex relative">
                                <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10">
                                    <MagnifyingGlassIcon className="h-4 w-4" />
                                </div>
                                <input id="search" type="text" name="search" class="text-sm sm:text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-8 focus:outline-none focus:border-indigo-400" placeholder="Поиск отправления..." />
                            </div>
                        </form>
                        <div class="flex ml-auto">
                            <div class="flex flex-row items-center">
                                <span class="flex flex-col ml-2">
                                    <span class="w-auto whitespace-nowrap truncate max-w-prose font-semibold tracking-wide leading-none">{user === null ? '' : user.first_name}</span>
                                    <span class="w-auto whitespace-nowrap text-right truncate max-w-prose text-gray-500 text-xs leading-none mt-1">{user === null ? '' : (user.role_id === 6 ? 'Оператор ПВЗ' : '')}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
                <div class="main-content flex flex-col flex-grow p-4">
                    <li class="inline-flex items-center">
                        <span href="#" class="inline-flex items-center text-sm font-medium rounded-lg text-gray-800 hover:bg-gray-100 hover:text-gray-400 transition-colors">
                            <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                            {document.title}
                        </span>
                    </li>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Wrapper;