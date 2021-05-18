import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeList from '../components/Employee/EmployeeListComponent';
import CustomizedSnackbars from '../common/Snackbar';
import { appConstant } from '../constants/appConstant';
import { getEmployeeList, turnOffErrorAlert } from '../actions/employeeAction';
import { CircularIndeterminate } from '../common/ProgressBar';

const EmployeeContainer = () => {
    const dispatch = useDispatch()
    const employeeList = useSelector((state) => state.employee)

    useEffect(() => {
        getData();
    }, [])

    const handleAlertClose = (isOpen) => {
        dispatch(turnOffErrorAlert())    
    }

    const getData = () => {
        dispatch(getEmployeeList())
    }
    
    return (
        <div>
            <EmployeeList employeeListData={employeeList} />
            { employeeList.loading && <CircularIndeterminate /> }
            <CustomizedSnackbars 
                open={employeeList.error ? true : false} 
                handleClose={handleAlertClose} 
                alertMsg={employeeList.error} 
                severityType={appConstant.SNACKBAR_SEVERITY.ERROR}
            />
        </div>
    )
}

export default EmployeeContainer
