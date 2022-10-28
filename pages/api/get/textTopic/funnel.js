import axios from "axios";

export default function handler(req, res) {
    return res.send([
        {
            label:"Topo (descoberta)",
            value: "Topo (descoberta)"
        },
        {
            label:"Meio (consideração)",
            value: "Meio (consideração)"
        },
        {
            label:"Fundo (conversão)",
            value: "Fundo (conversão)"
        },
        {
            label:"Não se aplica",
            value: "Não se aplica"
        },
    ])
}
