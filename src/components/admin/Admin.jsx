import GetSMS from './GetSMS';
import GiveShipment from './GiveShipment';
import { useEffect } from 'react'

const Admin = () => {

    useEffect(() => {
        document.title = "Админ фичи";
    });

    return (
        <>
            <GetSMS />
            <GiveShipment />
        </>
    )
}

export default Admin