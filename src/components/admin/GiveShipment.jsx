import { useState } from 'react'
import { getShipment, sendShipmentSMS, issuedShipment } from '../../api/shipments';
import { toast } from 'react-toastify';
import { parseCode } from '../../lib/common';
import Modal from 'react-modal';
import { XMarkIcon } from '@heroicons/react/24/outline';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const GiveShipment = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [shipmentID, setShipmentID] = useState();
    const [SMSCode, setSMSCode] = useState();
    const [confirmGiveCode, setConfirmGiveCode] = useState();
    const [isLoading, setIsLoading] = useState(false);
    //Math.floor(Math.random() * 1000) + 1

    const closeModal = () => setIsOpen(false)
    const openModal = () => setIsOpen(true)

    const handleSubmitGive = e => {
        e.preventDefault();
        setIsLoading(true);
        var shipmentid = shipmentID;
        if ((shipmentID).toString().length === 13) {
            let code = parseCode((shipmentID).toString());
            shipmentid = code.id;
        }
        getShipment(shipmentid)
            .then((response) => {
                let code = response.data.sms
                if (code === null || code === "" || code === undefined) {
                    console.log('no-code, send code to user')
                    sendShipmentSMS(shipmentid).then((response) => {
                        getShipment(shipmentid).then((response) => {
                            setSMSCode(response.data.sms);
                            openModal();
                        }).catch((err) => {
                            if (err.response.status === 404) toast.warning("Отправление не найдено")
                        })
                    }).catch((err) => {
                        if (err.response.status === 404) toast.warning("Отправление не найдено")
                    })
                }
                else {
                    setSMSCode(response.data.sms);
                    openModal();
                }
            })
            .catch((err) => {
                if (err.response.status === 404) toast.warning("Отправление не найдено")
            })
        setIsLoading(false);
    }

    const confirmGiveShipment = e => {
        e.preventDefault();
        if (SMSCode === confirmGiveCode) {
            issuedShipment(shipmentID, SMSCode)
            toast.success(`Отправление ${shipmentID} успешно выдано!`)
            closeModal();
        }
        else toast.error("Вы неверно ввели код подтверждения")
    }

    return (
        <>
            <div className='rounded-lg w-auto h-auto p-4 flex flex-col justify-center'>
                <form className="w-full" onSubmit={handleSubmitGive}>
                    {
                        isLoading ?
                            <div className='w-full flex justify-center'>
                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Загрузка...</span>
                            </div> :
                            <>
                                <div className="flex flex-col items-center py-2">
                                    <input className="mb-2 appearance-none bg-gray-200 p-8 border-blue-200 w-full text-gray-700 py-3 px-3 leading-tight focus:outline-none rounded-md" type="number" placeholder="Номер отправления" required aria-label="Номер отправления" onChange={(e) => setShipmentID(e.target.value)} />
                                    <button type="submit" className="w-full flex-shrink-0 bg-violet-600 hover:bg-violet-400 border-violet-600 hover:border-violet-400 text-sm border-4 text-white py-1 px-2 rounded transition-colors">
                                        Выдать посылку
                                    </button>
                                </div>
                            </>
                    }
                </form>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Окно подтверждения">
                <button className="float-right" onClick={closeModal}><XMarkIcon className="h-4 w-4"/></button>
                <h2>Для подтверждения выдачи напишите код {SMSCode}</h2>
                <form onSubmit={confirmGiveShipment}>
                    <input className="mb-2 appearance-none bg-gray-200 p-4 border-blue-200 w-full text-gray-700 py-3 px-3 leading-tight focus:outline-none" type="number" placeholder="Код подтверждения" max-length="4" required aria-label="Код подтверждения" onChange={(e) => setConfirmGiveCode(e.target.value)} />
                    <button type="submit" className="w-full flex-shrink-0 bg-violet-600 hover:bg-violet-400 border-violet-600 hover:border-violet-400 text-sm border-4 text-white py-1 px-2 rounded transition-colors">
                        Подтвердить выдачу
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default GiveShipment