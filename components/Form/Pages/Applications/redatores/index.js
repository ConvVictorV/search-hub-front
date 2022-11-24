import axios from "axios";
import { useSession } from "next-auth/react";
import React, { forwardRef, useEffect, useState } from "react";
import {
    Button,
    ButtonToolbar,
    Form,
    Message,
    Uploader,
    useToaster,
    Stack,
    Input,
    ButtonGroup,
    Divider,
    TagPicker,
    Schema
} from "rsuite";
import Select from "../../../Components/Select";
import Tag from "../../../Components/tag";
import Overview from "../../../../Tables/applications/quickwins/overview"



const dataDscontenttype = ['Post de blog','Institucional','Página de produto','Texto de apoio'].map(
    item => ({ label: item, value: item })
  );

const dataDscontentcategory = ['Animais','Beleza','Carreira','Casa e Decoração','Cinema','Comercial',
'Comércio','Comportamento','Criatividade','Cultura','Direito','Educação','Empreendedorismo','Floricultura',
'Finanças','Gastronomia','Intercâmbio','Manutenção e Construção','Marketing','Mercado Imobiliário','Moda',
'Música','Paisagismo','Política','Previdência','Psicologia','Saúde','Tecnologia','Viagens'].map(
    item => ({ label: item, value: item })
  );

const dataDspagetypes = ['Posts de blog','Textos jornalísticos','Branded content','Textos de apoio e-commerce',
'Texto de apoio institucional','Texto de apoio FAQ Page','Landing Page','Guia definitivo'].map(
    item => ({ label: item, value: item })
  );

const dataDsclientes = ['Posts de blog','Textos jornalísticos','Branded content','Textos de apoio e-commerce',
'Texto de apoio institucional','Texto de apoio FAQ Page','Landing Page','Guia definitivo'].map(
    item => ({ label: item, value: item })
  );



const { StringType, NumberType } = Schema.Types;


// eslint-disable-next-line react/display-name
const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const model = Schema.Model({
    dsname : StringType().isRequired('O campo não pode estar vazio'),
    dsemail : StringType().isRequired('O campo não pode estar vazio'),
    dseducation : StringType(),
    dsportfolio : StringType().isURL(),
    nbwordsavaiable : NumberType('Digite um número válido.').isRequired('O campo não pode estar vazio.').min(1,"Digite um valor válido.").max(150,"Digite um valor até 150."),
    dsworkavaiable :StringType().isRequired('O campo não pode estar vazio'),
    dscontenttype :StringType().isRequired('O campo não pode estar vazio'),
    dscontentcategory:StringType().isRequired('O campo não pode estar vazio'),
    dspagetypes :StringType().isRequired('O campo não pode estar vazio'),
    dsclientes :StringType().isRequired('O campo não pode estar vazio'),
    dspaymenttype :StringType().isRequired('O campo não pode estar vazio'),
    dsvalue : StringType().isRequired('O campo não pode estar vazio'),
    dsstatus :StringType().isRequired('O campo não pode estar vazio'),
});

function FormComponent({ data, closeModal, footer, sendText, ...rest }) {
    const formRef = React.useRef();
    const [customer, setCustomer] = useState('');
    const [exportData, setExportData] = useState(data || []);
    const [files, setFiles] = useState([]);
    const session = useSession();
    const toast = useToaster();
    const [rowData, setRowData] = useState([]);
    const [formError, setFormError] = useState({});
    const [formValue, setFormValue] = useState({
        dsname,
        nbwordsavaiable,
        dsworkavaiable,
        dsphone,
        dsemail,
        dseducation,
        dsportfolio,
        dtcreate,
        dsvalue
    });
    const [dskeyword, setDskeyword] = useState('');
    const [dsurl, setDsurl] = useState('');
    const [dsvolume, setDsvolume] = useState('');
    const [dsposition, setDsposition] = useState('');
    const [dstype, setDstype] = useState('');
    const [dscontent, setDscontent] = useState('');
    const [dsobjective, setDsobjective] = useState('');
    
    const [dsname, setDsname] = useState('');
    const [nbwordsavaiable, setNbwordsavaiable] = useState('');
    const [dsworkavaiable, setDsworkavaiable] = useState('Select');
    const [dsphone, setDsphone] = useState('');
    const [dsemail, setDsemail] = useState('');
    const [dseducation, setDseducation] = useState('');
    const [dsportfolio, setDsportfolio] = useState('');
    const [dtcreate, setDtcreate] = useState('');
    const [dsvalue, setDsvalue] = useState('');

    const [dsstatus, setDsstatus] = useState('Select');
    const [dspaymenttype, setDspaymenttype] = useState('Select');
    const [dscontenttype, setDscontenttype] = useState('Select');
    const [dscontentcategory, setDscontentcategory] = useState('Select');
    const [dspagetypes, setDspagetypes] = useState('Select');
    const [dsclientes, setDsclientes] = useState('Select');
    
    const [dsdensity, setDsdensity] = useState('');
    const [dsmonth, setDsmonth] = useState('')
    const [dsyear, setDsyear] = useState(2022)

    function clearInputs() {
        [...document.querySelectorAll('.rs-stack:not(:last-child):not(:first-child) span.rs-picker-toggle-clean.rs-btn-close, .rs-btn-toolbar span.rs-picker-toggle-clean.rs-btn-close')].map(clean=>clean.click())
        setDskeyword('');
        setDsurl('');
        setDsvolume('');
        setDsposition('');
        setDstype('');
        setDscontent('');
        setDsobjective('');
        setDsdensity('');
        setRefresh(refresh + 1)
            
 
        
    }

    const [tableData, setTableData] = useState([]);

    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
    }, [tableData])

    const messageLoading = (
        <Message showIcon type={"info"} duration={0}>
            Processando dados!
        </Message>
    );
    const messageSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Quickwins criados!
        </Message>
    );
    const messageError = (
        <Message showIcon type={"error"} duration={5000}>
            Ocorreu um erro!
        </Message>
    );


    const clearToast = async () =>
        new Promise((res, rej) => {
            toast.clear();
            setTimeout(() => {
                res();
            }, 1000);
        });

    const sucessHandle = async () => {
        await clearToast().then(() => {
            toast.push(messageSucess, { placement: "topCenter" });
        });
    };

    const errorHandle = async (message) => {
        await clearToast().finally(() => {
            toast.push(
                <Message showIcon type={"error"} duration={5000}>
                    {message || "Ocorreu um erro!"}
                </Message>,
                { placement: "topCenter" }
            );
        });
    };

    return (
        <Form 
        fluid 
        layout="inline" 
        ref={formRef}
        onChange={setFormValue}
        formValue={formValue}
        onCheck={setFormError} 
        model={model}>
            
            <Stack
                direction="row"
                alignItems="flex-start"
                spacing={'30px'}
                justifyContent={'center'}
            >
                <Stack
                    direction="column"
                    spacing="10px"
                    alignItems={"initial"}
                >
                    <Form.Group controlId="dsname" ref={forwardRef}>
                        <Form.ControlLabel>Nome</Form.ControlLabel><br></br>
                        <Form.Control name="dsname" onChange={setDsname} value={dsname} />
                    </Form.Group>
                    <Form.Group controlId="nbwordsavaiable" ref={forwardRef}>
                        <Form.ControlLabel>Disponibilidade de palavras</Form.ControlLabel>
                        <Form.Control name="nbwordsavaiable" onChange={setNbwordsavaiable} value={nbwordsavaiable} />
                    </Form.Group>
                    <Form.ControlLabel style={{
                        lineHeight: "12px"
                    }}>Dedicação</Form.ControlLabel>
            <       Select
                        fetch={"/api/get/writer/workavaiable"}
                        placeholder={dsworkavaiable}
                        onSelect={setDsworkavaiable}
                        style={{
                            width:300,
                            marginTop:-4
                        }}
                    />
                </Stack>
                <Stack
                    direction="column"
                    spacing="10px"
                    style={{
                        height: "100%"
                    }}
                    alignItems={"initial"}
                >
                    <Form.Group controlId="dsphone" ref={forwardRef}>
                        <Form.ControlLabel>Telefone</Form.ControlLabel>
                        <Form.Control name="dsphone" onChange={setDsphone} value={dsphone} />
                    </Form.Group>

                    <Form.Group controlId="dsemail" ref={forwardRef}>
                        <Form.ControlLabel>E-mail</Form.ControlLabel>
                        <Form.Control name="dsemail" onChange={setDsemail} value={dsemail} />
                    </Form.Group>

                    <Form.Group controlId="dseducation" ref={forwardRef}>
                        <Form.ControlLabel>Área de Formação</Form.ControlLabel>
                        <Form.Control name="dseducation" onChange={setDseducation} value={dseducation} />
                    </Form.Group>

                    <Form.Group controlId="dsportfolio" ref={forwardRef}>
                        <Form.ControlLabel>Portfólio</Form.ControlLabel>
                        <Form.Control name="dsportfolio" onChange={setDsportfolio} value={dsportfolio} />
                    </Form.Group>
                </Stack>
            </Stack>




            <Form.ControlLabel style={{
                lineHeight: "25px"
            }}>Tipos de Conteúdo</Form.ControlLabel><br></br>
            <TagPicker data={dataDscontenttype} onChange={setDscontenttype} style={{ width: 700 }} />            

            <Form.ControlLabel style={{
                lineHeight: "25px"
            }}>Categorias de Conteúdo</Form.ControlLabel><br></br>
            <TagPicker data={dataDscontentcategory} onChange={setDscontentcategory} style={{ width: 700 }} />

            <Form.ControlLabel style={{
                lineHeight: "25px"
            }}>Tipos de Páginas</Form.ControlLabel><br></br>
            <TagPicker data={dataDspagetypes} onChange={setDspagetypes} style={{ width: 700 }} />            

            <Form.ControlLabel style={{
                lineHeight: "25px"
            }}>Clientes que atende</Form.ControlLabel><br></br>
            <Tag fetch={"/api/get/select/customersId"} onChange={setDsclientes} style={{ width: 700 }} />







            <Stack
                direction="row"
                alignItems="flex-start"
                spacing={'30px'}
                justifyContent={'center'}
            >
                <Stack
                    direction="column"
                    spacing="10px"
                    alignItems={"initial"}
                >
                    <Form.ControlLabel style={{
                        lineHeight: "12px"
                    }}>Tipo de Pagamento</Form.ControlLabel>
            <Select
                        fetch={"/api/get/writer/paymenttype"}
                        placeholder={dspaymenttype}
                        onSelect={setDspaymenttype}
                        style={{
                            width:300,
                            marginTop:-4
                        }}
                    />

                    <Form.Group controlId="dtcreate" ref={forwardRef}>
                        <Form.ControlLabel>Data de entrada</Form.ControlLabel>
                        <Form.Control name="dtcreate" onChange={setDtcreate} value={dtcreate} />
                    </Form.Group>
                </Stack>
                <Stack
                    direction="column"
                    spacing="10px"
                    style={{
                        height: "100%"
                    }}
                    alignItems={"initial"}
                >
                    <Form.Group controlId="dsvalue" ref={forwardRef}>
                        <Form.ControlLabel>Valor cobrado por 50 palavras</Form.ControlLabel>
                        <Form.Control name="dsvalue" onChange={setDsvalue} value={dsvalue} />
                    </Form.Group>

                    <Form.ControlLabel style={{
                        lineHeight: "12px"
                    }}>Status</Form.ControlLabel>
            <Select
                        fetch={"/api/get/writer/status"}
                        placeholder={dsstatus}
                        onSelect={setDsstatus}
                        style={{
                            width:300,
                            marginTop:-4
                        }}
                    />



                </Stack>
            </Stack>



            <hr />
            <ButtonToolbar style={{
                float: "right"
            }}>

                <Button 
                    style={{
                        backgroundColor: "var(--color-conversion-1)",
                        color: "var(--color-darkness-background)",
                    }}
                    onClick={() => {
                        axios.post('/api/post/writers', {
                            dsname,
                            nbwordsavaiable,
                            dsworkavaiable,
                            dsphone,
                            dsemail,
                            dseducation,
                            dsportfolio,
                            dtcreate,
                            dsvalue,
                            dsstatus,
                            dspaymenttype,
                            dscontenttype,
                            dscontentcategory,
                            dspagetypes,
                            dsclientes
                        })
                            .catch((e) => {
                                typeof e.response.data != "object"
                                    ? errorHandle(e.response.data)
                                    : errorHandle(e.response.data?.message);
                            });
                    }}
                >Salvar Redator</Button>

            </ButtonToolbar>
        </Form>
    );
}

export default FormComponent;
