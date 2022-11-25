import axios from "axios";

export default async function handler(req, res) {
  const { qwPackages } = req.body || {};

  for await(let qw of qwPackages){
    axios
    .get(`https://search-hub-backend-nukcfjbsza-rj.a.run.app/qwpackages/mail-contentteam/${qw || ""}?items=2000&page=1`)
    .catch((err) => res.status(500).send(err.data));
  }

  res.status(200).send("ok")
}

export const config = {
  api: {
    responseLimit: false,
  },
};
