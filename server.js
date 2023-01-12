const express = require('express')
const bodyParser = require("body-parser");
var cors = require('cors')
const axios = require('axios');
const app = express()
const port = 3001;

function getHeaders(req) {
    return {
        'Accept': 'application/json, text/plain, */*',
        'Origin': 'https://pvz.exmail24.ru',
        'Authorization': req.headers.authorization,
        'X-XSRF-TOKEN': req.headers.cookie['XSRF-TOKEN'],
        'Cookie': req.headers.cookie,
        'Referer': 'https://pvz.exmail24.ru/',
        'Content-Type': 'application/json',
        'Accept-Language': 'ru',
        'Host': 'pvz.exmail24.ru',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
    }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(
    {
        credentials: true,
        origin: "http://localhost:3000",
    }
))

app.post('/sanctum/token', async (req, res) => {
    try {
        const response = await axios.post(
            'https://pvz.exmail24.ru/api/sanctum/token',
            {
                'password': req.body.password,
                'email_adress': req.body.email_adress,
                'remember': req.body.remember
            },
            {
                headers: {
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'ru',
                    'Host': 'pvz.exmail24.ru',
                    'Origin': 'https://pvz.exmail24.ru',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
                    'Connection': 'keep-alive',
                    'Referer': 'https://pvz.exmail24.ru/',
                    'Content-Length': '78',
                },
            }
        );
        res.status(200)
        return res.json(response.data)
    }
    catch (err) {
        res.status(401)
        return res.json({
            "error": err
        })
    }
})

app.post("/sanctum/user", async (req, res) => {
    try {
        const response = await axios.post(
            'https://pvz.exmail24.ru/api/sanctum/user',
            {},
            {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Origin': 'https://pvz.exmail24.ru',
                    'Authorization': req.headers.authorization,
                    'Referer': 'https://pvz.exmail24.ru/',
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ru',
                    'Host': 'pvz.exmail24.ru',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive'
                },
            }
        );
        const cookieHeaders = response.headers['set-cookie'];
        res.set("Set-Cookie", cookieHeaders);
        return res.json({authenticated: true, user: response.data})
    }
    catch (err) {
        res.status(401)
        return res.json({
            "error": err
        })
    }
})

app.get("/shipments/:shipmentID", async (req, res) => {
    try {
        const response = await axios.get(
            `https://pvz.exmail24.ru/api/shipments/${req.params.shipmentID}`,
            {
                headers: getHeaders(req)
            }
        );
        return res.json(response.data)
    }
    catch (err) {
        res.status(404)
        return res.json({"error": err.message})
    }
})

app.get("/shipments/:shipmentID/sms", async (req, res) => {
    try {
        const response = await axios.get(
            `https://pvz.exmail24.ru/api/shipments/${req.params.shipmentID}/sms`,
            {
                headers: getHeaders(req)
            }
        );
        return res.json(response.data)
    }
    catch (err) {
        res.status(404)
        return res.json({"error": err.message})
    }
})

app.post("/shipments/:shipmentID/issued", async (req, res) => {
    try {
        const response = await axios.put(
            `https://pvz.exmail24.ru/api/shipments/${req.params.shipmentID}/issued`,
            {sms: req.body.sms},
            {
                headers: getHeaders(req)
            }
        );
        return res.json(response.data)
    }
    catch (err) {
        res.status(404)
        return res.json({"error": err.message})
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})