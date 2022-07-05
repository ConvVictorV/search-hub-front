import { getSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import { Navbar, Dropdown, FlexboxGrid } from 'rsuite';
import ExitIcon from '@rsuite/icons/Exit';

export default function Header(args) {
  const [session, setSession] = useState({})
  useEffect(() => {
    getSession().then(r => setSession(r))
  }, [])
  const { AvatarGroup, Badge, Avatar } = require('rsuite/esm/');
  const renderIconButton = (props, ref) => {
    return (
      <AvatarGroup>
        <Badge content={false}>
          <Avatar {...props} ref={ref} circle src={session && session.user && session.user.image || ''} alt={session && session.user && session.user.email || ''} />
        </Badge>
      </AvatarGroup>
    );
  };
  const handleSignout = () => signOut()
  
  return (
    <div className='header'>
      <Navbar style={{ background: 'var(--color-main)', height: '62.84px' }}>
        <FlexboxGrid align="top" justify="end" style={{
          padding:'11px '
        }}>
            <Dropdown placement="bottomEnd" renderToggle={renderIconButton}>
              <Dropdown.Item onSelect={handleSignout} icon={<ExitIcon />}>Sign out</Dropdown.Item>
            </Dropdown>
        </FlexboxGrid>
      </Navbar>
    </div>
  )
}