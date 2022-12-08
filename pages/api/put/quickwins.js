import axios from "axios";

export default function handler(req, res) {
  axios
    .patch(`http://localhost:3005/quickwins/${req.body.id}`, req.body)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => {
      res
        .status(err.response?.status || 500)
        .send(err.response.data || "Ocorreu um erro");
    });
}
