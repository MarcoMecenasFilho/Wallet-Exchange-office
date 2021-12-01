import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitEdit } from '../actions';
import { Button } from 'react-bootstrap';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.submitInfos = this.submitClick.bind(this);
  }

  submitClick(infos, currentExpenses) {
    const { submitExpense } = this.props;
    const editExpense = currentExpenses
      .expenses.filter((elem) => (elem.id === currentExpenses.idEdit));
    const { exchangeRates, id } = editExpense[0];
    const expenseEdited = {
      id,
      ...infos,
      exchangeRates,
    };
    submitExpense(expenseEdited, id);
  }

  render() {
    const { status, click, currentExpenses, infos } = this.props;
    const btnEdit = (
      <Button
        variant="warning"
        type="button"
        onClick={ () => this.submitClick(infos, currentExpenses) }
      >
        Editar despesa
      </Button>);
    const btnAdd = (
      <Button
        variant="success"
        type="button"
        onClick={ click }
      >
        Adicionar despesa
      </Button>);
    return (
      status ? btnEdit : btnAdd

    );
  }
}

const mapStateToProps = (state) => ({
  currentExpenses: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  submitExpense: (expenseEdited, id) => dispatch(submitEdit(expenseEdited, id)),
});

Buttons.propTypes = {
  click: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
  submitExpense: PropTypes.func.isRequired,
  currentExpenses: PropTypes.objectOf(PropTypes.array).isRequired,
  infos: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
