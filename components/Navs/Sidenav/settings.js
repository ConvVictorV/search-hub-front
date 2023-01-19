import PeoplesIcon from "@rsuite/icons/Peoples";
import SingleSourceIcon from "@rsuite/icons/SingleSource";
import OperatePeopleIcon from '@rsuite/icons/OperatePeople';

module.exports.settingsItems = [
  {
    url: "/customers",
    name: "Clientes",
    icon: PeoplesIcon,
    active: true,
  },
  {
    url: "/customers/projects",
    name: "Projetos",
    icon: SingleSourceIcon,
    active: true,
  },

  {
    url: "/customers/squads",
    name: "Squads",
    icon: OperatePeopleIcon,
    active: true,
  },
];
