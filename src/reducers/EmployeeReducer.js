const intialState = {
    loading: '',
    data: [],
    error: ''
}

const employeeReducer = (state = intialState, action) => {
    const { type,  payload } = action;
    
    switch(type) {
        case 'SET_EMPLOYEE_LIST':
            return { 
                ...state,
                loading: payload.loading,
                data: payload.data,
                error: payload.error
            }
        case 'DELETE_EMPLOYEE_BY_ID':
            if(payload.error) {
                return {
                    ...state,
                    loading: payload.loading,
                    error: payload.error
                }
            }
            const fiteredRecord = state.data.filter(emp => emp.id !== payload.removedUserId);
            const updatedState = {...state, data: fiteredRecord};
            return updatedState;
        case 'TURN_OFF_ERROR_ALERT':
            return {...state, error: payload.error}
        default:
            return state; 
    }
}

export default employeeReducer