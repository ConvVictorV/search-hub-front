import GearCircleIcon from "@rsuite/icons/Gear";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function Sidenav() {
  const { Sidebar, Sidenav, Nav } = require("rsuite/esm/");
  const [expanded, setExpanded] = useState(
    localStorage.getItem("menuState") || false
  );
  const [activeKey, setActiveKey] = useState(1);
  const { sidenavItems } = require("./items");
  const { settingsItems } = require("./settings");
  const route = useRouter();
  return (
    <div style={{ zIndex: 3 }}>
      <Sidebar
        style={{ display: "flex", flexDirection: "column" }}
        width={expanded == true || expanded == "true" ? 260 : 56}
        collapsible
      >
        <Sidenav
          expanded={expanded == true || expanded == "true" ? true : false}
          style={{
            height: "100vh",
            position: "fixed",
            maxWidth: "260px",
            boxShadow: "1px 0px 10px 0px #0000003b",
          }}
        >
          <Sidenav.Header>
            <Link href={"/"} passHref>
              <div
                style={{
                  fontSize: expanded == true || expanded == "true" ? 16 : 0,
                  minHeight: "62.84px",
                  transition: "all .5s",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/logo-colored.svg"
                  width={30}
                  height={30}
                  alt="Logo Conversion Colorida"
                />
                <h4 className="logo-name">SearchHub</h4>
              </div>
            </Link>
            <hr />
            <Sidenav.Toggle
              style={{
                position: "absolute",
                right: "-17px",
                top: "16px",
                border: "none",
              }}
              expanded={expanded == true || expanded == "true" ? true : false}
              onToggle={(expanded) => {
                setExpanded(expanded);
                localStorage.setItem("menuState", expanded);
              }}
            />
          </Sidenav.Header>

          <Sidenav.Body style={{
            height:"100%"
          }}>
            <Nav
              activeKey={activeKey}
              onSelect={setActiveKey}
              onSelectCapture={setActiveKey}
              style={{
                height:"100%"
              }}
            >
              {sidenavItems.map((item, key) =>
                item.active ? (
                  <Link href={item.url || "/"} passHref key={key}>
                    <Nav.Item
                      active={item.url === route.pathname}
                      eventKey={key}
                      icon={<item.icon /> || false}
                    >
                      {item.name || ""}
                    </Nav.Item>
                  </Link>
                ) : (
                  ""
                )
              )}
              <hr/>
              <Nav.Menu
                placement="rightEnd"
                title="Gerenciar"
                icon={<GearCircleIcon />}
                eventKey={10}
                active={false}
                style={{
                  position:"absolute",
                  bottom:"50px",
                  borderTop: "1px solid var(--rs-border-primary)",
                  borderBottom: "1px solid var(--rs-border-primary)"
                }}
              >
                
                {settingsItems.map((item, key) =>
                  item.active ? (
                    <Link href={item.url || "/"} passHref key={key}>
                      <Nav.Item
                        active={item.url === route.pathname}
                        eventKey={"10-" + key}
                        icon={<item.icon /> || false}
                      >
                        {item.name || ""}
                      </Nav.Item>
                    </Link>
                  ) : (
                    ""
                  )
                )}
                
              </Nav.Menu>
             
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidebar>
    </div>
  );
}

export default Sidenav;
