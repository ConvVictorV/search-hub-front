import axios from "axios"
const fastcsv = require("fast-csv");

export default function handler(req, res) {
    const { idcustomer } = req.query || {}
    const { content } = req.body || {}
    let csv = ''
    if (content) {
        fastcsv
            .write(content, { headers: true })
            .on('data', (row) => { csv += row })
            .on('end', () => res.status(200).send(csv))
    }
    axios.get(`${process.env.BACKENDHOST}/words/${idcustomer || ''}`)
        .then(({ data }) => {
            fastcsv
                .write(data, { headers: true })
                .on('data', (row) => { csv += row })
                .on('end', () => res.status(200).send(csv))
        })
        .catch(err => res.status(500).send(err))
}

