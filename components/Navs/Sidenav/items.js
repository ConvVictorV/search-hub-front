const { Dashboard } = require('@rsuite/icons/');
import PeoplesIcon from '@rsuite/icons/Peoples';
import SingleSourceIcon from '@rsuite/icons/SingleSource';
import PageIcon from '@rsuite/icons/Page';

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
        icon: PeoplesIcon,
        active: true
    },
    {
        url: "/customers/projects",
        name: "Projetos",
        icon: SingleSourceIcon,
        active: true
    },
    {
        url: "/applications/content-gap",
        name: "Content Gap",
        icon: Dashboard,
        active: false
    },
    {
        url: "/applications/quick-wins",
        name: "QuickWins",
        icon: PageIcon,
        active: true
    },
    {
        url: "/applications/data-for-seo",
        name: "Gerenciador Data for SEO",
        icon: Dashboard,
        active: true
    }
]

