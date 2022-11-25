import axios from "axios";

export default function handler(req, res) {
    return res.send([
        {
            label: "Planejamento de termos",
            value: "Planejamento de termos"
        },
        {
            label: "Planejamento de pautas",
            value: "Planejamento de pautas"
        },
        {
            label: "Validação planejamento",
            value: "Validação planejamento"
        },
        {
            label: "Ajuste planejamento",
            value: "Ajuste planejamento"
        },
        {
            label: "Alocação redatores",
            value: "Alocação redatores"
        },
        {
            label: "Aguardando aceite redator",
            value: "Aguardando aceite redator"
        },
        {
            label: "Conteúdo em produção",
            value: "Conteúdo em produção"
        },
        {
            label: "Validação requisitos básicos",
            value: "Validação requisitos básicos"
        },
        {
            label: "Revisão ortográfica e gramatical",
            value: "Revisão ortográfica e gramatical"
        },
        {
            label: "Validação de qualidade",
            value: "Validação de qualidade"
        },
        {
            label: "Ajuste conteúdo produzido",
            value: "Ajuste conteúdo produzido"
        },
        {
            label: "Validação SEO",
            value: "Validação SEO"
        },
        {
            label: "Pedido de ajuste em validação SEO",
            value: "Pedido de ajuste em validação SEO"
        },
        {
            label: "Ajuste conteúdo em validação SEO",
            value: "Ajuste conteúdo em validação SEO"
        },
        {
            label: "Aguardando aprovação cliente",
            value: "Aguardando aprovação cliente"
        },
        {
            label: "Pedido de ajustes cliente",
            value: "Pedido de ajustes cliente"
        },
        {
            label: "Conteúdo em ajuste cliente",
            value: "Conteúdo em ajuste cliente"
        },
        {
            label: "Aprovado pelo cliente",
            value: "Aprovado pelo cliente"
        },
        {
            label: "Aguardando implementação",
            value: "Aguardando implementação"
        },
        {
            label: "Validação implementação",
            value: "Validação implementação"
        },
        {
            label: "Finalizado",
            value: "Finalizado"
        },
    ])
}
