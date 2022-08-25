import axios from "axios";

export default function handler(req, res) {
  return axios
    .get(`${process.env.BACKENDHOST}/projects/accounts`)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
}
