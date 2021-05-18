import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import ConfirmDialog from '../../common/ConfirmDialog';
import SearchBar from "material-ui-search-bar";
import { removeEmployeeRecord } from '../../actions/employeeAction';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
}));

const EmployeeList = ({ employeeListData }) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    
    const [employeeRowData, setEmployeeRowData] = useState(employeeListData)
    const [showConfirmDialog, setConfirmDialog] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    const [searched, setSearched] = useState("");

    const columnsConfig = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Name', width: 300 },
      { field: 'email', headerName: 'Email', width:300 },
      { field: 'phone', headerName: 'Phone', width: 200 },
      { field: 'operation', headerName: 'Operation', width: 300, 
        renderCell: (params) => (
            <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={() => {
                setConfirmDialog(true)
                setItemToDelete(params.row.id)
            }}
            >
                Delete
            </Button>)
        }
    ];

    useEffect(() => {
        setEmployeeRowData(employeeListData)
    }, [employeeListData])

    const removeData = (id) => {
        dispatch(removeEmployeeRecord(id))
    }

    const handleConfirmDialog = (isOpen, isConfirm) => {
        isConfirm && removeData(itemToDelete)
        setItemToDelete(null)
        setConfirmDialog(isOpen)
    }

    const requestSearch = (searchedVal) => {
        const filteredRows = employeeListData.data.filter((row) => {
          return row.name.toLowerCase().includes(searchedVal.toLowerCase());});
        setEmployeeRowData({...employeeListData, data: filteredRows})
    };
    
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };
    
    return (
        <>
            <h1>Employee List</h1>
            <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
            />
            <div style={{ height: 800, width: '100%' }}>
                <DataGrid 
                  rows={employeeRowData.data} 
                  columns={columnsConfig}
                  pageSize={10}
                  disableSelectionOnClick
                  loading={employeeRowData.loading}
                />
            </div>
            <ConfirmDialog 
                isOpen={showConfirmDialog}
                msg={'Do you want to delete this user?'} 
                title={'Delete user'} 
                hideShowConfirmDialog={handleConfirmDialog}
            />
        </>
    )
}

export default EmployeeList
