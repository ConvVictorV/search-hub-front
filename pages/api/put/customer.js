import axios from "axios";

export default function handler(req, res) {
  const authorization = req.headers.authorization;
  axios
    .put(`${process.env.BACKENDHOST}/customer`, req.body, {
      headers: {
        authorization: authorization,
      },
    })
    .then(() => res.status(200).send("Atualizado com Sucesso!"))
    .catch((err) => {
      res.status(405).send(err.response?.data || "Ocorreu um erro");
    });
}
