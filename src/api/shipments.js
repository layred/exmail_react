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

export { getShipment, sendShipmentSMS, issuedShipment};