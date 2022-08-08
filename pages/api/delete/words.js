import axios from "axios"


export default function handler(req, res) {
    const authorization = req.headers.authorization
    axios.delete(`${process.env.BACKENDHOST}/words`, {
        headers: {
            "authorization": authorization,
            ...req.body
        },
    })
        .then(() => res.status(200).send("Deletadas com Sucesso!"))
        .catch(err => { res.status(405).send(err.response?.data || "Ocorreu um erro") })
}

