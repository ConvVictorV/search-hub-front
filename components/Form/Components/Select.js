import axios from "axios";
import { useEffect, useState } from "react";

const Select = (props) => {
    const { SelectPicker, Loader } = require('rsuite');
    const [items, setItems] = useState([]);
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        if (props.fetch == undefined) return <></>
        axios.get(props.fetch)
            .then(({data}) => {
                setCustomers(data)
            })
    }, [])

    const onSelectItem = () => {

    }

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
            size={props.size || ''}
            disabled={props.disabled || false}
            style={{
                width: "94%",
                verticalAlign: "top"
            }}
            onSelect={props.onSelect || onSelectItem}
        />
    );
};

export default Select;