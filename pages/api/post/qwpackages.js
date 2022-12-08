import axios from "axios";


export default function handler(req, res) {
  axios
    .post(`https://search-hub-backend-nukcfjbsza-rj.a.run.app/qwpackages`,
    {
      "idcustomer": req.body[0].idcustomer,
      "dsmounthyear" : req.body[0].dsmonth + '-' +  req.body[0].dsyear,
      "dstype": req.body[0].dstype,
      "nbtotalqws": req.body.length,
      "nbtotalkeywords": req.body.reduce((total,item)=>total+=item.dsdensity,0),
      "dsstatus": req.body[0].dsstatus,
      "dsresponsible": req.body[0].dsresponsible,
      "dskey": req.body[0].fkIdqwpackage,
  }    
    )
    .then(({ data }) => res.status(200).send(data))
    .catch((err) => {
      res
        .status(err.response?.status || 500)
        .send(err.response.data || "Ocorreu um erro");
    });
}
