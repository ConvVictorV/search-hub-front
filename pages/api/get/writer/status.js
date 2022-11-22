import axios from "axios";

export default function handler(req, res) {
    return res.send([
        {
            label: 'Ativo',
            value: 'Ativo'
        },
        {
            label: 'Inativo',
            value: 'Inativo'
        }
    ])
}
