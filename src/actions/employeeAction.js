import { apiConstant } from '../constants/apiConstant';
import { employeeActionType } from '../constants/actionConstant';

const setEmployeeList = (data) => {
  return {
    type: employeeActionType.SET_EMPLOYEE_LIST,
    payload: data,
  };
}

export const getEmployeeList = () => dispatch => {
  const url = apiConstant.GET_EMPLOYEE_LIST

  fetch(url)
  .then(rawRes => rawRes.json())
  .then(res => {
    if (res.status === 200) {
      dispatch(setEmployeeList({
        loading: false,
        data: res.data,
        error: ''
      })
      );
    } else {
      dispatch(setEmployeeList({
        loading: false,
        data: [],
        error: "No employee data found"
      })
      );
    }
  })
  .catch(error => {
    dispatch(setEmployeeList({
      loading: false,
      data: [],
      error: "Something went wrong!"
    })
    );
  })
}

const deleteEmployeeById = (data) => {
  return {
    type: employeeActionType.DELETE_EMPLOYEE_BY_ID,
    payload: data,
  };
}

export const removeEmployeeRecord = (id) => dispatch => {
  const url = apiConstant.DELETE_EMPLOYEE_DATA_BY_ID
  const headerContent = {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id}),
  }

  fetch(url, headerContent)
  .then(rawRes => rawRes.json())
  .then(res => {
    if (res.status === 200) {
      dispatch(deleteEmployeeById({
        loading: false,
        data: res.data,
        error: '',
        removedUserId: id
      })
      );
    } else {
      dispatch(deleteEmployeeById({
        loading: false,
        error: "Failed to delete record"
      })
      );
    }
  })
  .catch(error => {
    dispatch(deleteEmployeeById({
      loading: false,
      data: [],
      error: "Something went wrong!"
    })
    );
  });
}

export const turnOffErrorAlert = () => dispatch => {
  dispatch({
    type: employeeActionType.TURN_OFF_ERROR_ALERT,
    payload: {error: ''},
  })
}
