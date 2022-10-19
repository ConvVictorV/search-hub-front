import axios from "axios";

export default function handler(req, res) {
  const { page } = req.query
  return axios
    .get(
      `https://southamerica-east1-iconic-rampart-279113.cloudfunctions.net/jira-integration?page=${page}`
    )
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
}
