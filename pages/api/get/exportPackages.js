import axios from "axios";
const fastcsv = require("fast-csv");

export default async function handler(req, res) {
  const { content } = req.body || {};
  let csv = "";
  if (content) {
    await Promise.all(
      content.map(async row => {
        const { dskey } = row
        const backend = process.env.ENV == 'DEV' ? 'https://search-hub-backend-homolog-nukcfjbsza-rj.a.run.app' : 'https://search-hub-backend-nukcfjbsza-rj.a.run.app'
        return await axios
          .get(`${backend}/quickwins${dskey ? "/key/" + dskey : "/"}`)
          .then(({ data }) => {
            fastcsv
              .write(data, { headers: true })
              .on("data", (row) => {
                csv += row;
              })
          })
          .catch((err) => res.status(500).send(err));
      })
    ).finally(() => {
      setTimeout(() => {
        res.send(csv)
      }, 2000 * (content.length || 1));
    })
  }
}
