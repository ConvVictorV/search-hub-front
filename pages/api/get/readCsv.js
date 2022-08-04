import axios from "axios"
const csv = require('csvtojson')

export default function handler(req, res) {
    const { content } = req.body || {}
    csv().fromString(content)
        .then(json => res.status(200).send(json))
        .catch(e => res.status(500).send("Erro ao converter csv"))
}

