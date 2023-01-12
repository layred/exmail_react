import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import ErrorPage from './components/ErrorPage';
import NotFound from './components/NotFound';
import Shipments from './components/Shipments'
import { APP_ROUTES } from './utils/constants';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { HomeIcon, InboxStackIcon } from '@heroicons/react/24/outline'
import { useUser } from './lib/customHooks';
import 'react-toastify/dist/ReactToastify.css';


const Sidebar = () => {
  const { user, authenticated } = useUser();
  if (!user || !authenticated) {
      return ;
  }

  return (
    <div className="min-h-screen flex flex-row bg-gray-100 shadow-md">
      <div className="flex flex-col w-56 bg-white overflow-hidden">
        <div className="flex items-center justify-center h-20 shadow">
          <h1 className="text-3xl uppercase text-indigo-700">Exmail</h1>
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <Link to={`/dashboard`} className="flex flex-row items-center h-8 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span className="inline-flex items-center justify-center h-10 w-10 text-lg text-gray-400"><HomeIcon className="h-4 w-4" /></span>
              <span className="text-sm font-medium">Главная</span>
            </Link>
          </li>
          <li>
            <Link to={`/shipments`} className="flex flex-row items-center h-8 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
              <span className="inline-flex items-center justify-center h-10 w-10 text-lg text-gray-400"><InboxStackIcon className="h-4 w-4" /></span>
              <span className="text-sm font-medium">Отправления</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className='w-screen h-screen flex min-h-screen min-w-screen'>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route errorElement={<ErrorPage />} exact path="/" element={<Navigate to={APP_ROUTES.DASHBOARD} />} />
          <Route errorElement={<ErrorPage />} exact path="/shipments" element={<Shipments />} />
          <Route errorElement={<ErrorPage />} path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
          <Route errorElement={<ErrorPage />} path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;