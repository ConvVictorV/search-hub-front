import axios from "axios";

export default function handler(req, res) {
  const authorization = req.headers.authorization;
  const backend = process.env.ENV == 'DEV' ? 'https://search-hub-backend-homolog-nukcfjbsza-rj.a.run.app' : 'https://search-hub-backend-nukcfjbsza-rj.a.run.app'
  axios
    .patch(`${backend}/projects/${req.body.idproject}`, req.body.data)
    .then(() => res.status(200).send("Atualizado com Sucesso!"))
    .catch((err) => {
      console.log(err)
      res.status(405).send(err.response?.data || "Ocorreu um erro");
    });
}
