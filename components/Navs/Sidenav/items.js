const { Dashboard } = require('@rsuite/icons/');
module.exports.sidenavItems = [
    {
        url: "/dashboard/demo",
        name: "Dashboard",
        icon: Dashboard,
        active: false
    },
    {
        url: "/register/customer",
        name: "Registrar Cliente",
        icon: Dashboard,
        active: false
    },
    {
        url: "/register/project",
        name: "Registrar Projeto",
        icon: Dashboard,
        active: false
    },
    {
        url: "/register/demo",
        name: "Table Example",
        icon: Dashboard,
        active: false
    },
    {
        url: "/customers",
        name: "Clientes",
        icon: Dashboard,
        active: true
    },
    {
        url: "/customers/projects",
        name: "Projetos",
        icon: Dashboard,
        active: true
    },
    {
        url: "/applications/content-gap",
        name: "Content Gap",
        icon: Dashboard,
        active: true
    },
    {
        url: "/register/worked-pages",
        name: "Páginas Trabalhadas",
        icon: Dashboard,
        active: true
    },
    {
        url: "/applications/data-for-seo",
        name: "Gerenciador Data for SEO",
        icon: Dashboard,
        active: true
    }
]

