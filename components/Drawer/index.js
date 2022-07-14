import { Drawer, Button } from 'rsuite'

const DrawerComponent = ({ title, size, placement, open, body, sendText, sendButton, setOpen, ...rest }) => {
    return (
        <Drawer size={size} placement={placement} open={open} onClose={() => setOpen(false)}>
            <Drawer.Header>
                {title && <Drawer.Title>{title}</Drawer.Title>}
                <Drawer.Actions>
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    {sendButton && <Button onClick={() => setOpen(false)} appearance="primary">
                        {sendText || "Confirmar"}
                    </Button>}
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
                {body}
            </Drawer.Body>
        </Drawer>
    )
}
export default DrawerComponent