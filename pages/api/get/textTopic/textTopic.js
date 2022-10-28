import axios from "axios";

export default function handler(req, res) {
  axios
    .get(`https://search-hub-backend-nukcfjbsza-rj.a.run.app/texttopics/${req.query.idquickwin || ''}`)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => {
      res
        .status(err.response?.status || 500)
        .send(err.response.data || "Ocorreu um erro");
    });
}
