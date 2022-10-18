import axios from "axios";

export default function handler(req, res) {
  axios
    .post(`https://search-hub-backend-nukcfjbsza-rj.a.run.app/projects`, req.body)
    .then(() => res.status(200).send("Criado com Sucesso!"))
    .catch((err) => res.status(500).send(err));
}
