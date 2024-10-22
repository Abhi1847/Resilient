import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getLTOListing, setLoading, updateLTOStatus} from "../../redux/actions/other";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from '@mui/material/Box';
import EnhancedTableHead from "../table/EnhancedTableHead";
import {getComparator, stableSort} from "../../helpers/common_data";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from "@mui/material/Stack";
import swal from "sweetalert";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const headCells = [
    {
        id: 'licensee_name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'address',
        numeric: false,
        disablePadding: false,
        label: 'Address',
    },
    {
        id: 'city',
        numeric: false,
        disablePadding: false,
        label: 'City',
    },
    {
        id: 'zip_code',
        numeric: false,
        disablePadding: false,
        label: 'Zip code',
    },
    {
        id: 'phone',
        numeric: false,
        disablePadding: false,
        label: 'Phone',
    },
    {
        id: '',
        numeric: false,
        disablePadding: false,
        label: '',
    }
];

const LTO = ({openLTOModal, closeLTOModal}) => {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('licensee_name');
    const [q, setQ] = useState("");
    const [searchParam] = useState(["licensee_name", "email", "city", "zip_code", "phone"]);

    useEffect(() => {
        getList();
    }, []);

    function search(items) {
        return items.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        });
    }

    // Get LTO list
    const getList = () => {
        dispatch(setLoading(true));
        dispatch(getLTOListing())
            .then((response) => {
                console.log('response', response);
                setData(response);
                dispatch(setLoading(false));
            })
            .catch(() => {
                dispatch(setLoading(false));
            });
    };

    // On close modal of LTO list
    const onClose = (event, reason) => {
        if (reason && reason === "backdropClick" && "escapeKeyDown")
            return;
        closeLTOModal(false);
    };

    // Handle table sorting
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Delete LTO
    const remove = (email, status) => {

        let title = 'Are you sure want to delete?';
        let dangerMode = true;

        if (status === 'verify') {
            title = 'Are you sure want to verify?';
            dangerMode = false;
        }

        swal({
            title: title,
            icon: "warning",
            dangerMode: dangerMode,
            buttons: ["Cancel", "Yes"],
        }).then(async (willDelete) => {
            if (willDelete) {
                dispatch(setLoading(true));
                dispatch(updateLTOStatus({email: email, status: status}))
                    .then(() => {
                        const filteredPeople = data.filter((item) => item.email !== email);
                        setData(filteredPeople);
                        dispatch(setLoading(false));
                    })
                    .catch(() => {
                        dispatch(setLoading(false));
                    });
            }
        });
    };


    return (
        <Dialog
            fullWidth={true}
            maxWidth={false}
            id="popupDialog"
            open={openLTOModal}
            onClose={onClose}
            scroll={'body'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogContent>
                <div className="row">
                    <div className="col-md-12">
                        <h4 className='m-0 mb-2'>
                            LTO List
                            <IconButton
                                className={'float-end p-0'}
                                color="inherit"
                                onClick={onClose}
                                aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                        </h4>
                        <div className="row mb-2">
                            <div className="col-md-8"/>
                            <div className="col-md-4">
                                <div className="form-group d-flex justify-content-between">
                                    <input
                                        type="search"
                                        className="form-control rounded-0 w-100"
                                        placeholder="Search for..."
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <Box sx={{width: '100%'}}>
                            <Paper sx={{width: '100%', mb: 2, overflow: 'hidden'}}>
                                <TableContainer sx={{maxHeight: 500}}>
                                    <Table
                                        stickyHeader
                                        sx={{minWidth: 750}}
                                        aria-labelledby="tableTitle"
                                        size={'medium'}>
                                        <EnhancedTableHead
                                            order={order}
                                            orderBy={orderBy}
                                            headCells={headCells}
                                            onRequestSort={handleRequestSort}
                                            rowCount={data.length}/>
                                        <TableBody>
                                            {search(stableSort(data, getComparator(order, orderBy)))
                                                .map((row, index) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            tabIndex={-1}
                                                            key={index}>
                                                            <TableCell/>
                                                            <TableCell>{row.licensee_name}</TableCell>
                                                            <TableCell>{row.email}</TableCell>
                                                            <TableCell>{row.address}</TableCell>
                                                            <TableCell>{row.city}</TableCell>
                                                            <TableCell>{row.zip_code}</TableCell>
                                                            <TableCell>{row.phone}</TableCell>
                                                            <TableCell>
                                                                <Stack direction="row">
                                                                    <IconButton
                                                                        title={'Approve'}
                                                                        aria-label="approve"
                                                                        onClick={() => remove(row.email, 'verify')}>
                                                                        <CheckCircleIcon/>
                                                                    </IconButton>
                                                                    <IconButton
                                                                        title={'Delete'}
                                                                        aria-label="delete"
                                                                        onClick={() => remove(row.email, 'delete')}>
                                                                        <DeleteIcon/>
                                                                    </IconButton>
                                                                </Stack>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LTO;
