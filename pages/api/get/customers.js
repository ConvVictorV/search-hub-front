import axios from "axios";

export default function handler(req, res) {
  return axios
    .get(`https://search-hub-backend-nukcfjbsza-rj.a.run.app/customers`)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
}
