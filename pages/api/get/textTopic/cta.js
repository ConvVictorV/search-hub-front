import axios from "axios";

export default function handler(req, res) {
    return res.send([
        {
            label:"Compartilhe o conteúdo",
            value: "Compartilhe o conteúdo"
        },
        {
            label:"Leia conteúdo complementar",
            value: "Leia conteúdo complementar"
        },
        {
            label:"Saiba mais sobre o produto/serviço",
            value: "Saiba mais sobre o produto/serviço"
        },
        {
            label:"Cadastre-se",
            value: "Cadastre-se"
        },
        {
            label:"Não se aplica",
            value: "Não se aplica"
        },
        {
            label:"Compre o produto",
            value: "Compre o produto"
        },
    ])
}
