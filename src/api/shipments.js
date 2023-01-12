import { client } from "./client";
import { API_URL } from "../utils/constants";

async function getShipment(shipmentID) {
    return await client.get(`${API_URL}/shipments/${shipmentID}`)
}

async function sendShipmentSMS(shipmentID) {
    return await client.get(`${API_URL}/shipments/${shipmentID}/sms`)
}

async function issuedShipment(shipmentID, sms) {
    return await client.post(`${API_URL}/shipments/${shipmentID}/issued/`, {"sms": sms})
}

async function getPochtaShipment(shipmentID) {
    return await client.get(`https://sa.exmail24.ru/api/shipments/get-id/${shipmentID}`)
}

async function getSticker(shipmentID) {
    return await client.get(`${API_URL}/shipments/${shipmentID}/etic-pdf`, {responseType: 'blob'})
}

export { getShipment, sendShipmentSMS, issuedShipment, getPochtaShipment, getSticker };