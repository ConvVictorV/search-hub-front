import axios from "axios";

export default function handler(req, res) {
  axios
    .post(`${process.env.BACKENDHOST}/words`, req.body)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => {
      res
        .status(err.response?.status || 500)
        .send(err.response.data || "Ocorreu um erro");
    });
}
