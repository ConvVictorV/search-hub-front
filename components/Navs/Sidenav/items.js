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
        active: true
    },
    {
        url: "/register/project",
        name: "Registrar Projeto",
        icon: Dashboard,
        active: true
    },
    {
        url: "/register/demo",
        name: "Table Example",
        icon: Dashboard,
        active: true
    },
    {
        url: "/customers",
        name: "Clientes",
        icon: Dashboard,
        active: true
    }
]

