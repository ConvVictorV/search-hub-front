import axios from "axios";

export default function handler(req, res) {
  const backend = process.env.ENV == 'DEV' ? 'https://search-hub-backend-homolog-nukcfjbsza-rj.a.run.app' : 'https://search-hub-backend-nukcfjbsza-rj.a.run.app'
  axios
    .delete(`${backend}/quickwins/${req.body.id}`)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => {
      res
        .status(err.response?.status || 500)
        .send(err.response.data || "Ocorreu um erro");
    });
}
