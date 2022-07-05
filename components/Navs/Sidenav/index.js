import React, { useState } from "react";
import Link from 'next/link'


function Sidenav() {
    const { Sidebar, Sidenav, Nav } = require('rsuite/esm/');
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');
    const { sidenavItems } = require('./items')
    return (
        <div>
            <Sidebar
                style={{ display: 'flex', flexDirection: 'column' }}
                width={expanded ? 260 : 56}
                collapsible
            >
                <Sidenav expanded={expanded} style={{ height: "100vh" }}>
                    <Sidenav.Header>
                        <Link href="/">
                            <a style={{ textDecoration: "none", color: "#fff" }}><div style={{
                                padding: 20,
                                background: 'var(--color-main)',
                                color: '#fff',
                                fontSize: expanded ? 16 : 0,
                                minHeight: '62.84px',
                                transition: "all .5s"
                            }}>
                                Search Hub
                            </div></a>
                        </Link>
                    </Sidenav.Header>
                    <Sidenav.Body>
                        <Nav activeKey={activeKey} onSelect={setActiveKey}>
                            {sidenavItems.map((item, key) =>
                                item.active ? <Link href={item.url || "/"} passHref>
                                    <Nav.Item eventKey={key + 1} icon={<item.icon /> || false}>
                                        {item.name || ''}
                                    </Nav.Item>
                                </Link> : ""
                            )}
                        </Nav>
                    </Sidenav.Body>
                    <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
                </Sidenav>
            </Sidebar>
        </div>
    );
};

export default Sidenav;