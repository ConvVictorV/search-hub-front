import axios from "axios";

export default function handler(req, res) {
    return res.send([
        {
            label: 'JANEIRO',
            value: 'JANEIRO'
        },
        {
            label: 'FEVEREIRO',
            value: 'FEVEREIRO'
        },
        {
            label: 'MARÇO',
            value: 'MARCO'
        },
        {
            label: 'ABRIL',
            value: 'ABRIL'
        },
        {
            label: 'MAIO',
            value: 'MAIO'
        },
        {
            label: 'JUNHO',
            value: 'JUNHO'
        },
        {
            label: 'JULHO',
            value: 'JULHO'
        },
        {
            label: 'AGOSTO',
            value: 'AGOSTO'
        },
        {
            label: 'SETEMBRO',
            value: 'SETEMBRO'
        },
        {
            label: 'OUTUBRO',
            value: 'OUTUBRO'
        },
        {
            label: 'DEZEMBRO',
            value: 'DEZEMBRO'
        }
    ])
}
