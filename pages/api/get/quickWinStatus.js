import axios from "axios";

export default function handler(req, res) {
    return res.send([
        {
            label: 'Planejamento de Termo',
            value: 'Planejamento de Termo'
        },
        {
            label: 'Planejamento de Pauta',
            value: 'Planejamento de Pauta'
        },
        {
            label: 'Enviado para Conteúdo',
            value: 'Enviado para Conteúdo'
        },
        {
            label: 'Conteúdo em produção',
            value: 'Conteúdo em produção'
        },
        {
            label: 'Conteúdo em revisão',
            value: 'Conteúdo em revisão'
        },
        {
            label: 'Validação SEO',
            value: 'Validação SEO'
        },
        {
            label: 'Envio ao cliente',
            value: 'Envio ao cliente'
        },
        {
            label: 'Pedido de Ajustes',
            value: 'Pedido de Ajustes'
        },
        {
            label: 'Aprovado pelo cliente',
            value: 'Aprovado pelo cliente'
        },
        {
            label: 'Implementado',
            value: 'Implementado'
        },
        {
            label: 'Finalizado',
            value: 'Finalizado'
        },
        {
            label: 'Pausado',
            value: 'Pausado'
        },
        {
            label: 'Cancelado',
            value: 'Cancelado'
        },
    ])
}
