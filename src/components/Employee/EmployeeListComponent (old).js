import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
}));

const EmployeeList = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const employeeList = useSelector((state) => state.employee)
    const [showConfirmDialog, setConfirmDialog] = useState()
    
    const removeData = (id) => {
        dispatch({
            type: 'DELETE_EMPLOYEE',
            payload: {employeeId: id}
        })
    }

    const renderHeader = () => {
        let headerElement = ['id', 'name', 'email', 'phone', 'operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return employeeList && employeeList.map(({ id, name, email, phone }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td className='opration'>
                        <Button
                            variant="contained"
                            color="default"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={() => removeData(id)}
                        >
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <h1 id='title'>Employee List</h1>
            <table id='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}

export default EmployeeList
