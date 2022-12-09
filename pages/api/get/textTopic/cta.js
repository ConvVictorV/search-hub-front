import axios from "axios";

export default function handler(req, res) {
    return res.send([
        {
            label:"Cadastre-se",
            value: "Cadastre-se"
        },
        {
            label:"Compartilhe o conteúdo",
            value: "Compartilhe o conteúdo"
        },
        {
            label:"Compre o produto",
            value: "Compre o produto"
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
            label:"Não se aplica",
            value: "Não se aplica"
        },
    ])
}
