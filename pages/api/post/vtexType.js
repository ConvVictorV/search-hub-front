import axios from "axios";

export default function handler(req, res) {
  axios
    .post(
      `https://southamerica-east1-iconic-rampart-279113.cloudfunctions.net/vtexVerifyTypePage`,
      req.body
    )
    .then((r) => {
      console.log(r);
      res.status(200).send(r.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
}
