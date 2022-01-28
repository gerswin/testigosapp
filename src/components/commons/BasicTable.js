import react from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';




const BasicTable = ({rows}) => {
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