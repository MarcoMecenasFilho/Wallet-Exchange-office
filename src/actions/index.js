import requestCurrenciesAPI from '../services/currencyAPI';
export const LOGIN_USER = 'LOGIN_USER';
export const EXPENSE_FORM = 'EXPENSE_FORM'; 
export const EXPENSE_DELETE = 'EXPENSE_DELETE';
export const ENABLE_EDIT = 'ENABLE_EDIT';
export const SUBMIT_EDIT = 'SUBMIT_EDIT';
const DEFAULT = 'DEFAULT';

export default function userLogin(value) {
  return {
    type: LOGIN_USER,
    payload: value,
  };
};

function expenseForm(expenseDetails, exchangeRates) {
  return {
    type: EXPENSE_FORM,
    payload: { ...expenseDetails,
      exchangeRates },
  };
};

export function expenseDelete(id) {
  return {
    type: EXPENSE_DELETE,
    id,
  };
}


export function enableEdit(id) {
  return {
    type: ENABLE_EDIT,
    id,
  };
};

export function submitEdit(expenseEdited, id) {
  return {
    type: SUBMIT_EDIT,
    payload: { ...expenseEdited },
    id,
  };
}

function fetchFailure() {
  return {
  type: DEFAULT,
  };
};

export function requestExpenseThunk(expenseDetails) {
  return async(dispatch) => {
    try {
    const response = await requestCurrenciesAPI()
    dispatch(expenseForm(expenseDetails, response));
    } catch {
      dispatch(fetchFailure())
    };
  };
}

function requestCurrencySuccess(response) {
  return {
    type: 'REQUEST_CURRENCY_SUCCESS',
    response,
  };
}

export function requestCurrencyThunk() {
  return async(dispatch) => {
    try{
    const response =  await requestCurrenciesAPI()
        dispatch(requestCurrencySuccess(response));
    }catch {
      dispatch(fetchFailure())
    }
  };
};
