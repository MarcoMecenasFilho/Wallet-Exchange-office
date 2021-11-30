import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Selects from '../components/Selects';
import { requestExpenseThunk, requestCurrencyThunk } from '../actions';
import Buttons from '../components/Buttons';
import TableWallet from '../components/TableWallet';
import { Stack, Form, FloatingLabel } from 'react-bootstrap';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Trabalho',
      description: 'Lolzinho',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    const { currenciesList } = this.props;
    currenciesList();
  }

  submitForm() {
    const { expenseWallet } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const expenseDetails = { value, currency, method, tag, description };
    expenseWallet(expenseDetails);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { listCurrencies, editStatus, history } = this.props;
    return (
      <div className="form-wallet">
        <Header history={history}/>
        <Form >
          <Stack direction="horizontal" gap={4}  >
            <FloatingLabel controlId="floatingSelect" label="Descrição">
              <Form.Control
                type="text"
                name="description"
                placeholder="Descrição"
                data-testid="description-input"
                onChange={ this.handleChange }
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingSelect" label="Despesa">
              <Form.Control 
                type="number" 
                name="value"
                placeholder="Despesa"
                data-testid="value-input"
                onChange={ this.handleChange }
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingSelect" label="Moeda">
              <Form.Select   
                onChange={ this.handleChange }
                name="currency"
                id="Currency"
                data-testid="currency-input"
              >
                { listCurrencies
                .map(
                  (moeda,
                    index) => <option key={ index } value={ moeda }>{moeda}</option>,
                )}
              </Form.Select>
            </FloatingLabel>
            <Selects onChange={ this.handleChange } />
            <Buttons
              click={this.submitForm}
              status={ editStatus }
              infos={ { value, currency, method, tag, description } }
            />
          </Stack>
        </Form>
        <TableWallet/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expenseWallet: (expenseDetails) => dispatch(requestExpenseThunk(expenseDetails)),
  currenciesList: () => dispatch(requestCurrencyThunk()),
});
const mapStateToProps = (state) => ({
  listCurrencies: state.wallet.currencies,
  editStatus: state.wallet.edit,
});

Wallet.propTypes = {
  expenseWallet: PropTypes.func.isRequired,
  currenciesList: PropTypes.func.isRequired,
  listCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editStatus: PropTypes.string.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
