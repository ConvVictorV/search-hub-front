import axios from "axios";

export default function handler(req, res) {
  axios
    .post(`https://search-hub-backend-nukcfjbsza-rj.a.run.app/writers`, req.body)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => {
      res
        .status(err.response?.status || 500)
        .send(err.response.data || "Ocorreu um erro");
    });
}
