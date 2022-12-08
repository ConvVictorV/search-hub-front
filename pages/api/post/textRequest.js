import axios from "axios";

export default function handler(req, res) {
  axios
    .post(`http://localhost:3005/textsrequests/`, req.body)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => {
        console.log(err)
      res
        .status(err.response?.status || 500)
        .send(err.response.data || "Ocorreu um erro");
    });
}
