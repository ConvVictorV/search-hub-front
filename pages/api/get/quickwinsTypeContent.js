import axios from "axios";

export default function handler(req, res) {
    return res.send([
        {
            label: 'Post de blog',
            value: 'Post de blog'
        },
        {
            label: 'Institucional',
            value: 'Institucional'
        },
        {
            label: 'Página de produto',
            value: 'Página de produto'
        },
        {
            label: 'Texto de apoio',
            value: 'Texto de apoio'
        }
    ])
}
