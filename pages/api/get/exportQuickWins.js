import axios from "axios";
const fastcsv = require("fast-csv");

export default async function handler(req, res) {
  const { idcustomer } = req.query || {};
  const { content } = req.body || {};
  let csv = "";
  if (content) {
    axios.post('https://script.google.com/macros/s/AKfycbwS75r9vSNlU4U8vjp7PDquAkaoOsgIyHW-_F33ZiLbQRrX4GdIOnauCoLBcFQ2f001vQ/exec', content).then(({ data }) => {
      return res.status(200).send({ data })
    })
  }
  else {
    return axios
      .get(`${process.env.BACKENDHOST}/quickwins/${idcustomer || ""}`)
      .then(({ data }) => {
        fastcsv
          .write(data, { headers: true })
          .on("data", (row) => {
            csv += row;
          })
          .on("end", () => res.status(200).send(csv));
      })
      .catch((err) => res.status(500).send(err));
  }
}
