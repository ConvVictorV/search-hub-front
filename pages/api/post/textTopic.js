import axios from "axios";

export default function handler(req, res) {
  const backend = process.env.ENV == 'DEV' ? 'https://search-hub-backend-homolog-nukcfjbsza-rj.a.run.app' : 'https://search-hub-backend-nukcfjbsza-rj.a.run.app'
  axios.defaults.headers.common['useremail'] = req.headers.useremail || 'não definido'
  axios
    .post(`${backend}/texttopics`, req.body)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => {
      res
        .status(err.response?.status || 500)
        .send(err.response.data || "Ocorreu um erro");
    });
}
