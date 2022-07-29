import axios from "axios"


export default function handler(req, res) {
    axios.get(`${process.env.BACKENDHOST}/customers/select/name`)
    .then(({data})=>res.status(200).send(data))
    .catch(err=>res.status(500).send(err))
}

