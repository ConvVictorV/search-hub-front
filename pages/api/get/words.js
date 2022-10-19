import axios from "axios";

export default function handler(req, res) {
  const { idcustomer, page } = req.query || {};
  return axios
    .get(`${process.env.BACKENDHOST}/words/${idcustomer || ""}?page=${page}`)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err.data));
}

export const config = {
  api: {
    responseLimit: false,
  },
};
