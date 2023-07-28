import { NavLink } from "react-router-dom";
import { CardLink, ClientContainer, ClientTableButtonNavLink, ClientTitle, LinkNewClient, PaginationCardUser } from "./client.list.styled";
import { api } from "../../../hooks/useApi";
import { useEffect, useState } from "react";
import { ImPencil2 } from 'react-icons/im';
import { makeStyles } from '@mui/styles';
import { Fab, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


const useStyles = makeStyles({
    table: {
        width: '100%',
        '& th, & td': {
            border: '1px solid #ddd',
        },
    },
    tableRow: {
        '&&': {
            height: '30px', // adjust as needed
        },
        '&:nth-of-type(odd)': {
            backgroundColor: '#f2f2f2', // adjust color as needed
        },
    },
});


export const ClientList = () => {



    const classes = useStyles();

    const [clients, setClients] = useState<any[]>([]);
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(1);



    function setResponse(res: any) {
    
        setClients(res.data.content)
        setPages(res.data.totalPages)
    }

    const handleChange = (e: any, currentPage: any) => {
        
        setPage(currentPage -1)
    }

    const getClient = async (page: number = 0) => {
        await api.get(`/client?page=${page}&size=8`)
            .then(response => {
                setResponse(response);
            });
    }

    useEffect(() => {
        getClient();
    }, [])

    useEffect(() => {
        getClient(page)
    }, [page]);

    return (
        <ClientContainer>
            {/* <ClientTitle>teste</ClientTitle> */}

            <CardLink>

                <LinkNewClient to={'/client/register'}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            marginBottom: '25px',

                        }}>
                        <AddIcon />
                    </Fab>
                </LinkNewClient>

            </CardLink>




            <TableContainer component={Paper} sx={{
                maxWidth: '90%',
                margin: '0 auto',
                marginBottom: '15px'
            }}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>CNPJ</TableCell>
                            <TableCell>CPF</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Data Cadastro</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.map((client) => (
                            <TableRow key={client.clientId} className={classes.tableRow}>
                                <TableCell>{client.clientId}</TableCell>
                                <TableCell>{client.clientName}</TableCell>
                                <TableCell>{client.company ? client.clientCnpj : ''}</TableCell>
                                <TableCell>{client.company ? '' : client.clientCpf}</TableCell>
                                <TableCell>{client.clientEmail}</TableCell>
                                <TableCell>{client.telephone}</TableCell>
                                <TableCell>{client.createAt}</TableCell>
                                <TableCell>
                                    <ClientTableButtonNavLink to={"/client/register"} state={{
                                        data: {
                                            clientId: client.clientId,
                                            clientName: client.clientName,
                                            clientCnpj: client.clientCnpj,
                                            clientCpf: client.clientCpf,
                                            clientEmail: client.clientEmail,
                                            clientResponsible: client.clientResponsible,
                                            telephone: client.telephone,
                                            company: client.company,
                                            zipcode: client.address.zipcode,
                                            state: client.address.state,
                                            city: client.address.city,
                                            district: client.address.district,
                                            street: client.address.street,
                                            homeNumber: client.address.homeNumber
                                        }
                                    }} className="btn btn-warning"><ImPencil2 /></ClientTableButtonNavLink>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>

            <PaginationCardUser>
                <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
            </PaginationCardUser>

        </ClientContainer>
    );
}
