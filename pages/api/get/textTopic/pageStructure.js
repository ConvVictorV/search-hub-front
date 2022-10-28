import axios from "axios";

export default function handler(req, res) {
    return res.send([
        {
            label:"Blog post sem elementos visuais",
            value:"Blog post sem elementos visuais"
        },
        {
            label:"Blog post com elementos visuais",
            value:"Blog post com elementos visuais"
        },
        {
            label:"Texto de apoio para página de e-commerce",
            value:"Texto de apoio para página de e-commerce"
        },
        {
            label:"Texto de apoio para página institucional",
            value:"Texto de apoio para página institucional"
        },
        {
            label:"Texto de apoio para FAQ Page",
            value:"Texto de apoio para FAQ Page"
        },
        {
            label:"Landing Page",
            value:"Landing Page"
        },
        {
            label:"Guia definitivo",
            value:"Guia definitivo"
        }
    ])
}
