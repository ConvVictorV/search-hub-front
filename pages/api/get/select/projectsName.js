import axios from "axios";

export default function handler(req, res) {
  return axios
    .get(`${process.env.BACKENDHOST}/projects/select/name`)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
}
