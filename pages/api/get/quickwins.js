import axios from "axios";

export default function handler(req, res) {
  const { idcustomer, page } = req.query || {};
  return axios
    .get(`https://search-hub-backend-nukcfjbsza-rj.a.run.app/quickwins/${idcustomer || ""}?items=2000&page=${page}`)
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err.data));
}

export const config = {
  api: {
    responseLimit: false,
  },
};
