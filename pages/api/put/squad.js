import axios from "axios";

export default function handler(req, res) {
  const authorization = req.headers.authorization;
  const backend = process.env.ENV == 'DEV' ? 'https://search-hub-backend-homolog-nukcfjbsza-rj.a.run.app' : 'https://search-hub-backend-nukcfjbsza-rj.a.run.app'
  const idsquad = req.body.idsquad;
  delete req.body.idsquad;
  axios
    .patch(`${backend}/squads/${idsquad}`, req.body)
    .then(() => res.status(200).send("Atualizado com Sucesso!"))
    .catch((err) => {
      console.log(err)
      res.status(405).send(err.response?.data || "Ocorreu um erro");
    });
}
