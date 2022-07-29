import axios from "axios"


export default function handler(req, res) {
    axios.post(`${process.env.BACKENDHOST}/project`,req.body)
    .then(()=>res.status(200).send("Criado com Sucesso!"))
    .catch(err=>res.status(500).send(err))
}

