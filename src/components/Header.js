import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import icone from '../images/logopink.gif';

const toFixedNumber = (num) => {
  const numberFixed = num.toFixed(2);
  return numberFixed;
};
// Essa função serve para fixar duas casas deciamis

class Header extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
    }
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    if(!localStorage.getItem('login')) {
      localStorage.setItem('login', JSON.stringify({
        email: 'ERRO, CRIAR USUÁRIO NOVAMENTE'}));
        const emailLocalStore = (JSON.parse(localStorage.getItem('login'))).email;
        this.setState({email: emailLocalStore})
    }
    if(localStorage.getItem('login')) {
        const emailLocalStore = (JSON.parse(localStorage.getItem('login'))).email;
        this.setState({email: emailLocalStore})
    }
  }

  login() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { email } = this.state;
    const { totalPrice = 0 } = this.props;
    const total = toFixedNumber(totalPrice);

    return (
      <header className="header-wallet">
          <img src={icone} alt="logo"></img>
          <div className="infos-header">
          <div className="btns-header">
                <Button variant="dark" type="button" onClick={this.login}>Login</Button>
                <Button
                  variant="warning"
                  type="button"
                  onClick={this.newUser}
                  className="btn-header-newuser"
                >
                  Novo Usuário
                </Button>
              </div>
              <div className="text-infos">
                <p  id="user-header" data-testid="email-field">Usuário: {email}</p>
                <div className="totalprice-div">
                  <p  data-testid="total-field">Valor total: R${ total } </p>
                  <p  data-testid="header-currency-field"> BRL</p>
                </div>
              </div>
              
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
