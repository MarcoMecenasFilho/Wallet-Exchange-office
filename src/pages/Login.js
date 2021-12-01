import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginEmail from '../actions';
import {Form, Button, FloatingLabel, Card } from 'react-bootstrap';
import logo from '../images/logopink.gif'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.newUser = this.newUser.bind(this);
  }

  componentDidMount() {
    if(!localStorage.getItem('login')) {
      localStorage.setItem('login', JSON.stringify({
        email: 'admin@admin.com', 
        password: 'lolzinho'}));
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  validateEmail(email) {
    const regex = /[\w]+@[\w]+.com/i;
    if (regex.test(email)) {
      return true;
    }

    return false;
  }

  submitUser(e) {
    e.preventDefault();
    const { userEmail, history } = this.props;
    const { email, password } = this.state;
    userEmail(email);
    const userLocalStore = JSON.parse(localStorage.getItem('login'));
    if(email === userLocalStore.email && password === userLocalStore.password){
      history.push('/carteira');
    } else {
      alert('email e/ou senha incorretos, caso continue com o erro. Cadastrar novo usuário')
    }
  }

  newUser() {
    const {history} = this.props;
    history.push('/newuser');
  }

  render() {
    const { email, password } = this.state;
    const MinNumberLetter = 6;
    return (
      <div className="div-login">
        {<img src={logo}  alt="logo"/>}
        <Card className="login-card">
        <Form onSubmit={ (e) => this.submitUser(e) } className="form">
          <h1>Login:</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-2"
          >
            <Form.Control 
              type="email"
              name="email"
              onChange={ this.handleChange }
              placeholder="Email"
              required
              data-testid="email-input" 
            />
            </FloatingLabel>
            <Form.Text className="text-muted">
              Nunca compartilhe seus dados de login.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel controlId="floatingPassword" label="Senha">
            <Form.Control
              type="password"
              name="password"
              onChange={ this.handleChange }
              placeholder="Senha"
              minLength="6"
              required
              data-testid="password-input"
            />
            </FloatingLabel>
          </Form.Group>
          <div className="button-login">
            <Button
              variant="primary"
              type="submit"
              disabled={
                !(((this.validateEmail(email)) && (password.length >= MinNumberLetter)))
              }
            >
            Entrar
            </Button>
            <Button
              variant="warning"
              type="button"
              onClick={this.newUser}
            >
            Novo Usuário
            </Button>
          </div>
        </Form>
        </ Card>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(loginEmail(email)),
});

Login.propTypes = {
  userEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
