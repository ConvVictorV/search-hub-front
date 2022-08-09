import axios from "axios"


export default function handler(req, res) {
    const { idcustomer } = req.query || {}
    axios.get(`${process.env.BACKENDHOST}/quickwins/${idcustomer || ''}`)
    .then(({data})=>res.status(200).send(data))
    .catch(err=>res.status(500).send(err))
}

