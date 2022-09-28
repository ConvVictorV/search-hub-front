const { Dashboard } = require("@rsuite/icons/");
import ListIcon from "@rsuite/icons/List";
import PageIcon from "@rsuite/icons/Page";
import PencilSquare from "@rsuite/icons/legacy/PencilSquare";
import Bolt from "@rsuite/icons/legacy/Bolt";
import Creative from "@rsuite/icons/legacy/Creative";

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
    url: "/applications/palavras-estrategicas",
    name: "Palavras Estratégicas",
    icon: Creative,
    active: true,
  },
  {
    url: "/applications/actions",
    name: "Ações do projeto",
    icon: Bolt,
    active: true,
  },
  {
    url: "/applications/quick-wins",
    name: "QuickWins",
    icon: PencilSquare,
    active: true,
  },
];
