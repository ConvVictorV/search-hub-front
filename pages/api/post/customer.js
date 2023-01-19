import axios from "axios";

export default function handler(req, res) {
  const backend = process.env.ENV == 'DEV' ? 'https://search-hub-backend-homolog-nukcfjbsza-rj.a.run.app' : 'https://search-hub-backend-nukcfjbsza-rj.a.run.app'
  axios.defaults.headers.common['useremail'] = req.headers.useremail || 'não definido'
  axios
    .post(`${backend}/customers`, req.body)
    .then(() => res.status(200).send("Criado com Sucesso!"))
    .catch((err) => res.status(500).send(err));
}
