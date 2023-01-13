import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { APP_ROUTES } from './utils/constants';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { HomeIcon, InboxStackIcon, RocketLaunchIcon, PaperAirplaneIcon, BugAntIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { useUser } from './lib/customHooks';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react'

const Wrapper = () => {
  return (
    <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <header class="header bg-white shadow py-4 px-4">
        <div class="header-content flex items-center flex-row">
          <form action="#">
            <div class="hidden md:flex relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input id="search" type="text" name="search" class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400" placeholder="Search..." />
            </div>
            <div class="flex md:hidden">
              <a href="#" class="flex items-center justify-center h-10 w-10 border-transparent">
                <svg class="h-6 w-6 text-gray-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </a>
            </div>
          </form>
          <div class="flex ml-auto">
            <a href="" class="flex flex-row items-center">
              <img src="https://pbs.twimg.com/profile_images/378800000298815220/b567757616f720812125bfbac395ff54_normal.png" alt="" class="h-10 w-10 bg-gray-200 border rounded-full" />
              <span class="flex flex-col ml-2">
                <span class="truncate w-20 font-semibold tracking-wide leading-none">John Doe</span>
                <span class="truncate w-20 text-gray-500 text-xs leading-none mt-1">Manager</span>
              </span>
            </a>
          </div>
        </div>
      </header>
      <div class="main-content flex flex-col flex-grow p-4">
        <h1 class="font-bold text-2xl text-gray-700">Dashboard</h1>

        <div class="flex flex-col flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4"></div>
      </div>
      <footer class="footer px-4 py-6">
        <div class="footer-content">
          <p class="text-sm text-gray-600 text-center">© Brandname 2020. All rights reserved. <a href="https://twitter.com/iaminos">by iAmine</a></p>
        </div>
      </footer>
    </main>
  )
}


const Sidebar = () => {
  const { user, authenticated } = useUser();
  if (!user || !authenticated) {
    return;
  }

  return (
    <aside class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-indigo-500">
      <div class="sidebar-header flex items-center justify-center py-4">
        <div class="inline-flex">
          <Link to={`/`} class="inline-flex flex-row items-center">
            <span class="leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase">Exmail</span>
          </Link>
        </div>
      </div>
      <div class="sidebar-content px-4 py-6">
        <ul class="flex flex-col w-full">
          <li class="my-px">
            <Link to={`/dashboard`} class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700">
              <span class="flex items-center justify-center text-lg text-gray-400">
                <HomeIcon className="h-6 w-6" />
              </span>
              <span class="ml-3">Главная</span>
            </Link>
          </li>
          <li class="my-px">
            <Link to={`/shipments`} class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700">
              <span class="flex items-center justify-center text-lg text-gray-400">
                <InboxStackIcon className="h-6 w-6" />
              </span>
              <span class="ml-3">Отправления</span>
            </Link>
          </li>
          <li class="my-px">
            <Link to={`/sendings`} class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700">
              <span class="flex items-center justify-center text-lg text-gray-400">
                <RocketLaunchIcon className="h-6 w-6" />
              </span>
              <span class="ml-3">Отправка</span>
            </Link>
          </li>
          <li class="my-px">
            <Link to={`/freights`} class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700">
              <span class="flex items-center justify-center text-lg text-gray-400">
                <PaperAirplaneIcon className="h-6 w-6" />
              </span>
              <span class="ml-3">Перевозки</span>
              {/* <span class="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">1k</span> */}
            </Link>
          </li>
          <li class="my-px">
            <Link to={`/admin`} class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700">
              <span class="flex items-center justify-center text-lg text-green-400">
                <BugAntIcon className="h-6 w-6" />
              </span>
              <span class="ml-3">Админ панель</span>
            </Link>
          </li>
          {/* <li class="my-px">
            <span class="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">Account</span>
          </li>
          <li class="my-px">
            <Link href="#" class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700">
              <span class="flex items-center justify-center text-lg text-gray-400">
                <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </span>
              <span class="ml-3">Profile</span>
            </Link>
          </li>
          <li class="my-px">
            <a href="#" class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700">
              <span class="flex items-center justify-center text-lg text-gray-400">
                <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </span>
              <span class="ml-3">Notifications</span>
              <span class="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">10</span>
            </a>
          </li>
          <li class="my-px">
            <a href="#" class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700">
              <span class="flex items-center justify-center text-lg text-gray-400">
                <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </span>
              <span class="ml-3">Settings</span>
            </a>
          </li>
          */}
          <li class="my-px">
            <Link to={`/logout`} class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700">
              <span class="flex items-center justify-center text-lg text-red-400">
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              </span>
              <span class="ml-3">Выйти</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}

function App() {
  return (
    <div className='flex flex-row min-h-screen bg-gray-100 text-gray-800'>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route errorElement={<ErrorPage />} exact path="/" element={<Navigate to={APP_ROUTES.DASHBOARD} />} />
          <Route errorElement={<ErrorPage />} exact path="/admin" element={<Admin />} />
          <Route errorElement={<ErrorPage />} exact path="/freights" element={<Freights />} />
          <Route errorElement={<ErrorPage />} exact path="/shipments" element={<Shipments />} />
          <Route errorElement={<ErrorPage />} exact path="/sendings" element={<Sendings />} />
          <Route errorElement={<ErrorPage />} exact path={APP_ROUTES.SIGN_IN} title="Вход" element={<SignIn />} />
          <Route errorElement={<ErrorPage />} path={APP_ROUTES.DASHBOARD} title="Главная" element={<Dashboard />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;