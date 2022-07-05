import { useEffect, useState } from "react";

const Select = (props) => {
    const { SelectPicker, Loader } = require('rsuite');
    const [items, setItems] = useState([]);
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        if (props.fetch == undefined) return <></>
        fetch(props.fetch)
            .then((res) => res.json())
            .then((data) => {
                setCustomers(data)
            })
    }, [])
    

   

    const updateData = () => {
        if (items.length === 0) {
            setItems(customers);
        }
    };

    const renderMenu = menu => {
        if (items.length === 0) {
            return (
                <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                    <Loader content="Loading..." />
                </p>
            );
        }
        return menu;
    };

    return (
        <SelectPicker
            placeholder={props.placeholder || "Selecione"}
            data={items}
            onOpen={updateData}
            onSearch={updateData}
            renderMenu={renderMenu}
            style={{
                width: "300px",
                verticalAlign: "top"
            }}
        />
    );
};

export default Select;