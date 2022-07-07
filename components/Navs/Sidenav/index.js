import React, { useState } from "react";
import Link from 'next/link'
import styles from '../../../styles/Sidenav.module.css'
import Image from "next/image";
import { useRouter } from "next/router";

function Sidenav() {
    const { Sidebar, Sidenav, Nav } = require('rsuite/esm/');
    const [expanded, setExpanded] = useState(localStorage.getItem('menuState') || false);
    const [activeKey, setActiveKey] = useState(1);
    const { sidenavItems } = require('./items')
    const route = useRouter()
    return (
        <div>
            <Sidebar
                style={{ display: 'flex', flexDirection: 'column' }}
                width={expanded == true || expanded == 'true' ? 260 : 56}
                collapsible
            >
                <Sidenav expanded={expanded == true || expanded == 'true' ? true : false} style={{ height: "100vh", position: 'fixed', maxWidth: '260px' }}>
                    <Sidenav.Header>
                        <div style={{
                            fontSize: expanded == true || expanded == 'true' ? 16 : 0,
                            minHeight: '62.84px',
                            transition: "all .5s",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center"
                        }}>
                            <Image src="/logo-colored.svg" width={30} height={30} />
                            <h4 className="logo-name">SearchHub</h4>
                        </div>
                        <hr />
                        <Sidenav.Toggle style={{
                            position: 'absolute',
                            right: '-17px',
                            top: '16px',
                            border:"none"
                        }} expanded={expanded == true || expanded == 'true' ? true : false} onToggle={expanded => { setExpanded(expanded); localStorage.setItem('menuState', expanded) }} />
                    </Sidenav.Header>
                    <Sidenav.Body>
                        <Nav activeKey={activeKey} onSelect={setActiveKey} onSelectCapture={setActiveKey}>
                            {sidenavItems.map((item, key) =>
                                item.active ? <Link href={item.url || "/"} passHref key={key}>
                                    <Nav.Item active={item.url === route.pathname} eventKey={key} icon={<item.icon /> || false}>
                                        {item.name || ''}
                                    </Nav.Item>
                                </Link> : ""
                            )}
                        </Nav>
                    </Sidenav.Body>

                </Sidenav>
            </Sidebar>
        </div>
    );
};

export default Sidenav;