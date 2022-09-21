import axios from "axios";

export default function handler(req, res) {
  return axios
    .get(
      `https://southamerica-east1-iconic-rampart-279113.cloudfunctions.net/jira-integration`
    )
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
}
