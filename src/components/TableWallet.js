import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { enableEdit, expenseDelete } from '../actions';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

const toFixedNumber = (num) => {
  const numberFixed = num.toFixed(2);
  return numberFixed;
};

const heads = [ 'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir'];

  console.log(heads);
class TableWallet extends Component {
  componentDidUpdate() {
    this.expensesLocalStorage();
  }

  expensesLocalStorage() {
    const { infoWallet } = this.props;
    localStorage.setItem('myExpenses', JSON.stringify(infoWallet));
  }


  render() {
    const { infoWallet, deleteExpense, editExpense } = this.props;
    return (
      <div className="table-wallet"> 
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              {heads.map((elem, index) => (
                <th key={index}>{elem}</th>
              ))}             
            </tr>
          </thead>
          <tbody>
            {infoWallet.map((elem, index) => (
                <tr key={ index }>
                  <td>{elem.id}</td>
                  <td>{elem.description}</td>
                  <td>{elem.tag}</td>
                  <td>{elem.method}</td>
                  <td>{elem.value}</td>
                  <td>
                    {elem.exchangeRates[elem.currency].name.split('/')[0]}
                  </td>
                  <td>
                    {toFixedNumber(Number(elem.exchangeRates[elem.currency].ask))}
                  </td>
                  <td>
                    {toFixedNumber(elem.value * elem.exchangeRates[elem.currency].ask)}
                  </td>
                  <td>Real</td>
                  <td>
                    <Button
                      size="sm"
                      variant="primary"
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => editExpense(elem.id) }
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      type="button"
                      onClick={ () => deleteExpense(elem.id) }
                      data-testid="delete-btn"
                    >
                      Deletar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ Table>
          </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  infoWallet: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(expenseDelete(id)),
  editExpense: (id) => dispatch(enableEdit(id)),
});

TableWallet.propTypes = {
  infoWallet: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableWallet);
