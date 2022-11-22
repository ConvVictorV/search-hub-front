import axios from "axios";

export default function handler(req, res) {
    return res.send([
        {
            label: 'Nota Fiscal',
            value: 'Nota Fiscal'
        },
        {
            label: 'RPA',
            value: 'RPA'
        }
    ])
}
