import axios from "axios";

export default function handler(req, res) {
    return res.send([
        {
            label: 'Integral',
            value: 'Integral'
        },
        {
            label: 'Parcial',
            value: 'Parcial'
        }
    ])
}
