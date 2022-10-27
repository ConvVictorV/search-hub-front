import React, { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    IconButton,
    Table,
    Badge,
    Divider
} from "rsuite";

import CloseIcon from "@rsuite/icons/Close";
import EditIcon from "@rsuite/icons/Edit";

const { HeaderCell, Cell, Column } = Table;

// custom cells
const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
        <div style={{ lineHeight: "46px" }}>
            <Checkbox
                value={rowData[dataKey]}
                inline
                onChange={onChange}
                checked={checkedKeys.some((item) => item === rowData[dataKey])}
            />
        </div>
    </Cell>
);
const StatusCell = ({ rowData, dataKey, ...props }) => {
    const { blstatus } = rowData;
    return (
        <Cell {...props} className="link-group">
            <div style={{ marginTop: "-8px" }}>
                {(blstatus !== undefined && (
                    <Button
                        appearance="ghost"
                        style={{
                            color: "var(--color-conversion-7)",
                            borderColor: "var(--color-conversion-7)",
                            width: "100%",
                        }}
                    >
                        <Badge style={{ background: "var(--color-conversion-7)" }} />{" "}
                        {"Implementado"}
                    </Button>
                )) || (
                        <Button
                            appearance="ghost"
                            style={{
                                color: "var(--color-conversion-4)",
                                borderColor: "var(--color-conversion-4)",
                                width: "100%",
                            }}
                        >
                            <Badge style={{ background: "var(--color-conversion-4)" }} />{" "}
                            {"inativo"}
                        </Button>
                    )}
            </div>
        </Cell>
    );
};
const Inserted = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props}>{rowData?.dtimplement?.split("T")[0]}</Cell>
);
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// custom cells
const ActionCell = ({
    setDrawerOpenEdit,
    rowData,
    dataKey,
    setRowData,
    removeItem,
    ...props
}) => {
    function handleAction() {
        removeItem(rowData.tableid)
    }
    return (
        <Cell {...props} className="link-group">
            <div style={{ marginTop: "-8px" }}>
                {/* <IconButton
                    appearance="ghost"
                    size={'sm'}
                    // style={{
                    //     background: "var(--color-conversion-1)",
                    // }}
                    onClick={handleAction}

                    icon={<EditIcon />}
                /> */}
                <IconButton
                    appearance="ghost"
                    size={'sm'}
                    // style={{
                    //     background: "var(--color-conversion-1)",
                    // }}
                    onClick={handleAction}

                    icon={<CloseIcon />}
                />
            </div>
        </Cell>
    );
};

const WordTable = ({
    tableData,
    setDrawerOpenEdit,
    setRowData,
    removeItem
}) => {
    let [defaultValues, setDefaultValues] = useState(0)
    // setInterval(() => {
    //     //forçar reenderização
    //     setDefaultValues(defaultValues + 1)
    // }, 1000)
    useEffect(() => {

    }, [tableData])
    
    return (
        <Table
            virtualized
            data={tableData}
        >
            <Column resizable width={150} fixed align="center">
                <HeaderCell>Status</HeaderCell>
                <Cell dataKey="dsstatus" />
            </Column>
            <Column resizable width={150} fixed>
                <HeaderCell>Termo Principal</HeaderCell>
                <Cell dataKey="dskeyword" />
            </Column>
            <Column resizable width={150}>
                <HeaderCell>Mês de ref.</HeaderCell>
                <Cell dataKey="dsdate" />
            </Column>
            <Column resizable width={150}>
                <HeaderCell>Densidade de palavras</HeaderCell>
                <Cell dataKey="dsdensity" />
            </Column>
            <Column width={300} align="center">
                <HeaderCell>Url da página</HeaderCell>
                <Cell dataKey="dsurl" />
            </Column>
            <Column resizable width={130} align="center">
                <HeaderCell>Volume de busca</HeaderCell>
                <Cell dataKey="dsvolume" />
            </Column>
            <Column resizable width={100} align="center">
                <HeaderCell>Posição inicial</HeaderCell>
                <Cell dataKey="dsposition" />
            </Column>
            <Column resizable width={150} align="center">
                <HeaderCell>Tipo de otimização</HeaderCell>
                <Cell dataKey="dstype" />
            </Column>
            <Column resizable width={150} align="center">
                <HeaderCell>Tipo de conteúdo</HeaderCell>
                <Cell dataKey="dscontent" />
            </Column>
            <Column resizable width={150} align="center">
                <HeaderCell>Objetivo da otimização</HeaderCell>
                <Cell dataKey="dsobjective" />
            </Column>

            <Column width={150} verticalAlign={"top"} align="center">
                <HeaderCell>...</HeaderCell>
                <ActionCell
                    removeItem={removeItem}
                    setDrawerOpenEdit={setDrawerOpenEdit}
                    setRowData={setRowData}
                    dataKey="idcustomer"
                />
            </Column>
        </Table>
    );
};

export default WordTable;
