import axios from "axios";

export default async function handler(req, res) {
  const { qwPackages } = req.body || {};
  const backend = process.env.ENV == 'DEV' ? 'https://search-hub-backend-homolog-nukcfjbsza-rj.a.run.app' : 'https://search-hub-backend-nukcfjbsza-rj.a.run.app'
  for await(let qw of qwPackages){
    axios
    .get(`${backend}/qwpackages/mail-contentteam/${qw || ""}?items=2000&page=1`)
    .catch((err) => res.status(500).send(err.data));
  }

  res.status(200).send("ok")
}

export const config = {
  api: {
    responseLimit: false,
  },
};
