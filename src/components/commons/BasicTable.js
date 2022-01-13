import react from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function createData(field, info) {
    return { field, info };
}

const rows = [
    createData('Departamento', 'META', ),
    createData('Municipio', 'VILLAVICENCIO'),
    createData('Zona', '04'),
    createData('Puesto', 'COLEGIO COFREM'),
    createData('Direccion', 'CARRERA 20 - A NO. 35 - 02'),
    createData('Mesas asignadas', 'DESDE 10 HASTA 19'),
];

const BasicTable = () => {
    return (
        <TableContainer sx={{mt: 5}}>
            <Table sx={{minWidth: 650, mt: 5}} aria-label="simple table">
                <TableBody sx={{borderColor: "grey.grisDetalles"}}>
                    {
                        rows.map(row => (
                            <TableRow
                                key={row.field}
                                sx={{ borderLeft: 0, borderRight: 0, borderBottom: 1, borderTop: 0, borderColor: "grey.grisDetalles"  }}
                            >
                                <TableCell component="th" scope="row" sx={{fontSize: 14, fontWeight: 700, color: "grey.grisOscuro",  }} >
                                    {row.field}
                                </TableCell>
                                <TableCell component="th" scope="row" sx={{fontSize: 14, fontWeight: 400, color: "grey.grisOscuro", letterSpacing: "0.4px"  }} >
                                    {row.info}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BasicTable