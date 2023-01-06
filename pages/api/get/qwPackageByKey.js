import axios from "axios";

export default function handler(req, res) {
  const { key } = req.query || {};
  const backend = process.env.ENV == 'DEV' ? 'https://search-hub-backend-homolog-nukcfjbsza-rj.a.run.app' : 'https://search-hub-backend-nukcfjbsza-rj.a.run.app'
  return axios
    .get(`${backend}/qwpackages/key/${key || ""}`)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err.data));
}

export const config = {
  api: {
    responseLimit: false,
  },
};
