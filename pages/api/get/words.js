import axios from "axios";

export default function handler(req, res) {
  const { idcustomer } = req.query || {};
  return axios
    .get(`${process.env.BACKENDHOST}/words/${idcustomer || ""}`)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
}

export const config = {
  api: {
    responseLimit: false,
  },
};
