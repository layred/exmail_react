import GetSMS from './GetSMS';
import GiveShipment from './GiveShipment';
// import PrintSticker from './PrintSticker';

const Shipments = () => {

    return (
        <div className="p-8 bg-grey-100 h-screen w-screen">
            <div className='grid grid-cols-2 gap-4 font-mono text-white text-sm text-center font-bold leading-6 rounded-lg'>
                <GetSMS />
                <GiveShipment />
                {/* <PrintSticker /> */}
            </div>
        </div>
    )
}

export default Shipments