import axios from "axios";

export default function handler(req, res) {
  if (req.body.event) {
    axios.post('https://discord.com/api/webhooks/1027296773770846208/kZwQrA4eAM8puYHl3H7DDDNlAE7D1RWzIDONeEBfTCIS7GNpjsowqKkhzQ43vfdpzDIu', {
      content: (`\`\`\`${JSON.stringify({"quantidade de erros":req.body.event.value})}\`\`\``).replace(/,/g,",\n").replace('{','').replace('}','').replace(/"/g,'')
    }).then(r => {
      res.status(200).json({ "info": "sucesso" });
    }).catch((err) => {
      res.status(500).json(err.data);
    })
  } else {
    res.status(200).json({ name: "John Doe" });
  }

}
