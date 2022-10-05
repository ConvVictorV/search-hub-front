import axios from "axios";

export default function handler(req, res) {
    if(req.body.event){
        axios.post('https://discord.com/api/webhooks/1027296773770846208/kZwQrA4eAM8puYHl3H7DDDNlAE7D1RWzIDONeEBfTCIS7GNpjsowqKkhzQ43vfdpzDIu',{
            content:req.body.event
          }).then(r=>{
            res.status(200).json({ "info":"sucesso" });
          })
    }else{
        res.status(200).json({ name: "John Doe" });
    }
    
  }
  