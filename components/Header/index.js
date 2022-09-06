import ExitIcon from "@rsuite/icons/Exit";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Dropdown,
  FlexboxGrid,
  Navbar,
  Tooltip,
  Whisper,
} from "rsuite";

export default function Header(args) {
  const [session, setSession] = useState({});
  const [breadc, setBreadc] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getSession().then((r) => setSession(r));
    let routes = router.route.split("/");
    let str = "";
    let hlinks = [];
    routes.forEach((i, index, arr) => {
      if (i.charAt(0) == "[") {
        i = i.slice(1);
        i = i.slice(0, i.length - 1);
        arr[index] = router.query[i];
      }
      str = str + arr[index] + "/";
      if (str != "/") hlinks.push(str.replaceAll("/", ""));
    });

    for (let i = 0; i < hlinks.length; i++) {
      if (hlinks[i + 1]) {
        hlinks[i + 1] = hlinks[i + 1].replace(hlinks[i], "");
      }
    }
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    hlinks.unshift("inicio");
    hlinks = hlinks.map((link, index) => {
      let path = "";
      for (let i = 1; i <= index; i++) {
        path = path + "/" + hlinks[i];
      }
      return {
        name: toTitleCase(link),
        path: path || "/",
      };
    });
    setBreadc(hlinks);
  }, []);
  const { AvatarGroup, Badge, Avatar } = require("rsuite/esm/");
  const renderIconButton = (props, ref) => {
    return (
      <Whisper
        trigger="hover"
        placement={"left"}
        controlId={`control-id-left`}
        speaker={
          <Tooltip visible>
            {(session && session.user && session.user.name) || ""}
          </Tooltip>
        }
      >
        <AvatarGroup>
          <Badge content={false}>
            <Avatar
              {...props}
              ref={ref}
              circle
              src={(session && session.user && session.user.image) || ""}
              alt={(session && session.user && session.user.email) || ""}
            />
          </Badge>
        </AvatarGroup>
      </Whisper>
    );
  };
  const handleSignout = () => signOut();

  return (
    <div className="header">
      <Navbar style={{ background: "transparent", minHeight: "120px" }}>
        <FlexboxGrid
          align="top"
          justify="space-between"
          style={{
            padding: "20px 20px 20px 50px",
          }}
        >
          <div>
            {args.breadcrumb === undefined ? (
              <Breadcrumb>
                {breadc.map((item, index) => (
                  <Breadcrumb.Item key={index} href={item.path}>
                    {item.name}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            ) : (
              <></>
            )}
            {
              <h3
                style={{
                  paddingBottom: "0px",
                }}
              >
                {args.pageName}
              </h3>
            }
          </div>
          <div>
            <Dropdown placement="bottomEnd" renderToggle={renderIconButton}>
              <Dropdown.Item onSelect={args.toggleTheme}>
                Mudar tema
              </Dropdown.Item>
              <Dropdown.Item onSelect={handleSignout} icon={<ExitIcon />}>
                Sair
              </Dropdown.Item>
            </Dropdown>
          </div>
        </FlexboxGrid>
      </Navbar>
    </div>
  );
}
