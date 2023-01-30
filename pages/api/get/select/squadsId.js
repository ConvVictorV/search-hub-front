import axios from "axios";

export default function handler(req, res) {
  const backend = process.env.ENV == 'DEV' ? 'https://search-hub-backend-homolog-nukcfjbsza-rj.a.run.app' : 'https://search-hub-backend-nukcfjbsza-rj.a.run.app'
  return axios
    .get(`${backend}/squads`)
    .then(({ data }) => res.status(200).send(data.map(row => {
      return {
        value: row.idsquad,
        label: row.dsname
      }
    }).sort((a, b) => {
      const nameA = a.label.toUpperCase(); // ignore upper and lowercase
      const nameB = b.label.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    })))
    .catch((err) => res.status(500).send(err));
}
