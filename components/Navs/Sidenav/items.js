const { Dashboard } = require("@rsuite/icons/");
import ListIcon from "@rsuite/icons/List";
import PageIcon from "@rsuite/icons/Page";

module.exports.sidenavItems = [
  {
    url: "/dashboard/demo",
    name: "Dashboard",
    icon: Dashboard,
    active: false,
  },
  {
    url: "/register/customer",
    name: "Registrar Cliente",
    icon: Dashboard,
    active: false,
  },
  {
    url: "/register/project",
    name: "Registrar Projeto",
    icon: Dashboard,
    active: false,
  },
  {
    url: "/register/demo",
    name: "Table Example",
    icon: Dashboard,
    active: false,
  },
  {
    url: "/applications/content-gap",
    name: "Content Gap",
    icon: Dashboard,
    active: false,
  },
  {
    url: "/applications/quick-wins",
    name: "QuickWins",
    icon: PageIcon,
    active: true,
  },
  {
    url: "/applications/data-for-seo",
    name: "Data For SEO",
    icon: Dashboard,
    active: true,
  },
  {
    url: "/applications/actions",
    name: "Registro de ações",
    icon: ListIcon,
    active: true,
  },
];
