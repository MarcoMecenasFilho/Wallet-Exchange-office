import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginEmail from '../actions';
import {Form, Button, FloatingLabel, Card} from 'react-bootstrap';
import logo from '../images/logopink.gif'

class NewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.submitUser = this.submitUser.bind(this);
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
    const userLogin = {email, password}
    userEmail(email);
    localStorage.setItem('login', JSON.stringify(userLogin));
    history.push('/');
  }

  render() {
    const {email, password } = this.state;
    const MinNumberLetter = 6;
    return (
      <div className="div-login">
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; font-src 'self' data: fonts.gstatic.com;"/>
        {<img src={logo}  alt="logo"/>}
        <Card>
        <Form onSubmit={ (e) => this.submitUser(e) } className="form">
          <h1>Criar usuário:</h1>
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
          <Button
            variant="success"
            type="submit"
            disabled={
              !(((this.validateEmail(email)) && (password.length >= MinNumberLetter)))
            }
          >
          Criar usuário
          </Button>
        </Form>
        </ Card>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(loginEmail(email)),
});

NewUser.propTypes = {
  userEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(NewUser);
