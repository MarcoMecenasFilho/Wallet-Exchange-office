import { EXPENSE_FORM, EXPENSE_DELETE, ENABLE_EDIT ,SUBMIT_EDIT,  } from "../actions";

const expensesLocalStore = JSON.parse(localStorage.getItem('myExpenses')) ? JSON.parse(localStorage.getItem('myExpenses')) : [];

const INICIAL_STATE = {
  currencies: [],
  expenses: expensesLocalStore,
  priceTotal: 0,
  edit: false,
  idEdit: '',
};

const total = (expenses) => {
  const totalExpenses = expenses
    .reduce((acc, num) => {
      let bill = Number(num.value);
      bill = bill || 0;
      const totalBill = acc + bill * Number([num.exchangeRates[num.currency].ask]);
      return totalBill;
    }, 0);
  return totalExpenses;
};

const currenciesList = (currencies) => {
  const currency = currencies;
  delete currency.USDT;
  return Object.keys(currency);
};

const newId = (id, actionId) => {
  let result = 0;
  if (id < actionId) {
    result = id;
    return result;
  }
  if (id > actionId) {
    result = id - 1;
    return result;
  }

  return result;
};

const walletReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case EXPENSE_FORM:
    return {
      ...state,
      currencies: currenciesList(action.payload.exchangeRates),
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
      priceTotal: total([...state.expenses, { ...action.payload }]),
    };
  case 'REQUEST_CURRENCY_SUCCESS':
    return {
      ...state,
      currencies: currenciesList(action.response),
    };
  case EXPENSE_DELETE:
    return {
      ...state,
      expenses: state.expenses.filter((elem) => elem.id !== action.id)
        .map((elem) => ({
          ...elem, id: newId(elem.id, action.id),
        })),
      priceTotal: total(state.expenses.filter((elem) => elem.id !== action.id)),

    };
  case ENABLE_EDIT:
    return { ...state,
      edit: true,
      idEdit: action.id,
    };
  case SUBMIT_EDIT:
    return {
      ...state,
      expenses: [{ ...action.payload },
        ...state.expenses.filter((elem) => elem.id !== action.id)]
        .sort((a, b) => a.id - b.id),
      edit: false,
      idEdit: '',
      priceTotal: total([{ ...action.payload },
        ...state.expenses.filter((elem) => elem.id !== action.id)]),
    };
  default: return { ...state, priceTotal: total(state.expenses) };
  }
};

export default walletReducer;
