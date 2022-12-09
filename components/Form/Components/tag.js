import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Tag = (props) => {
  const { TagPicker, Loader } = require("rsuite");
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRouter()

  useEffect(() => {
    if (props.fetch == undefined) return <></>;
    axios.get(props.fetch).then(({ data }) => {
      setCustomers(data);
      updateData()
    });
  }, []);

  const onTagItem = (a) => {
    const customer = customers.filter(customer => customer.value == a)[0]
    const customerName = (customer?.label).toLowerCase().replace(/ /g, '-').replace(/\(/g, '').replace(/\)/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const routePath = route.pathname == '/' ? "/applications/palavras-estrategicas" : (route.pathname.split('/')[1]) + "/" + (route.pathname.split('/')[2])
    setLoading(true)
    if (a) {
      if (localStorage.getItem('customerName') != customerName) {
        localStorage.setItem('customerName', customerName)
        localStorage.setItem('customerId', customer.value)
      }
      route.push("/" + routePath + "/customer/" + customerName).then(() => {
        setLoading(false)
      })
    } else {
      localStorage.removeItem('customerName')
      localStorage.removeItem('customerId')
      const routePath = (route.pathname.split('/')[1]) + "/" + (route.pathname.split('/')[2])
      route.push("/" + routePath).then(() => {
        setLoading(false)
      })
    }
  };

  const onClear = () =>
    props.onTag ? props.onTag(undefined) : onTagItem(undefined);

  const updateData = () => {
    if (items.length === 0) {
      setItems(customers);
    }
  };

  const renderMenu = (menu) => {
    if (items.length === 0) {
      return (
        <span style={{ padding: 4, color: "#999", textAlign: "center" }}>
          <Loader content="Loading..." />
        </span>
      );
    }
    return menu;
  };

  return (
    <div style={{
      display: 'flex'
    }}>
      <TagPicker
        placeholder={props.placeholder || "Selecione"}
        data={items}
        onOpen={updateData}
        onSearch={updateData}
        renderMenu={renderMenu}
        size={props.size || "md"}
        disabled={props.disabled || false}
        onClean={onClear}
        style={{
          width: "94%",
          verticalAlign: "top",
        }}
        onTag={props.onTag || onTagItem}
        {...props}
      />
      {loading && <Loader style={{
        paddingLeft: '10px',
        display: 'flex',
        alignItems: 'center'
      }}></Loader>}
    </div>
  );
};

export default Tag;
