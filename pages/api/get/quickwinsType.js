import axios from "axios";

export default function handler(req, res) {
    return res.send([
        {
            label: 'Criação nova página',
            value: 'Criação nova página'
        },
        {
            label: 'Otimização',
            value: 'Otimização'
        },
        {
            label: 'Reotimização',
            value: 'Reotimização'
        },
    ])
}
