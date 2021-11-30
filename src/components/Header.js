import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import icone from '../images/iconeHeaderdark.png';

const toFixedNumber = (num) => {
  const numberFixed = num.toFixed(2);
  return numberFixed;
};
// Essa função serve para fixar duas casas deciamis

class Header extends Component {
  constructor() {
    super()
    this.login = this.login.bind(this);
  }

  login() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const email = (JSON.parse(localStorage.getItem('login'))).email;
    const { totalPrice = 0 } = this.props;
    const total = toFixedNumber(totalPrice);

    return (
      <header>
        <div className="header-elements">
          <img src={icone} alt="logo"></img>
          <div className="total-price">
            <p  data-testid="total-field">Valor total: R${ total } </p>
            <p  data-testid="header-currency-field"> BRL</p>
          </div>
          <p  id="user-header" data-testid="email-field">Usuário: {email}</p>
          <Button variant="dark" type="button" onClick={this.login}>Login</Button>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  totalPrice: state.wallet.priceTotal,
});

Header.propTypes = {
  totalPrice: PropTypes.number,
};

Header.defaultProps = {
  totalPrice: 0,
};

export default connect(mapStateToProps)(Header);
