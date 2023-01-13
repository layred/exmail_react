import { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../lib/customHooks';


const Logout = () => {
    const navigate = useNavigate();
    const { user, authenticated } = useUser();
    if (!user || !authenticated) {
        navigate('/signin')
    }

    useEffect(() => {
        localStorage.removeItem("token");
        Cookies.remove("XSRF-TOKEN")
        Cookies.remove("exmail_prod_session")
    })

    return navigate("/signin")
}

export default Logout