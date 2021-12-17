import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';

import { renderWithRouterAndStore } from './testConfig';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '123456';
const INVALID_EMAIL_0 = 'email';
const INVALID_EMAIL_1 = 'email@com@';
const INVALID_EMAIL_3 = 'alguem@email.';
const INVALID_PASSWORD = '23456';


describe('Crie uma página inicial de login com os seguintes campos e características:', () => {

  test('Crie um local para que o usuário insira seu email e senha', () => {
    renderWithRouterAndStore(<App />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });

  test('Crie dois botôes com data-testid "login-btn" e "newuser-btn"', () => {
    renderWithRouterAndStore(<App />, '/');

    const buttonLogin = screen.getByTestId('login-btn');
    const buttonNewUser = screen.getByTestId('newuser-btn');
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonNewUser).toBeInTheDocument();
  });

  test('Realize as seguintes verificações nos campos de email, senha e botão:', () => {
    renderWithRouterAndStore(<App />);

    const buttonLogin = screen.getByTestId('login-btn');
    expect(buttonLogin).toBeDisabled();

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, INVALID_EMAIL_0);
    userEvent.type(senha, VALID_PASSWORD);
    expect(buttonLogin).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL_1);
    userEvent.type(senha, VALID_PASSWORD);
    expect(buttonLogin).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL_3);
    userEvent.type(senha,INVALID_PASSWORD);
    expect(buttonLogin).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL_3);
    userEvent.type(senha, VALID_PASSWORD);
    expect(buttonLogin).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(buttonLogin).toBeEnabled();
  });


  test('A rota deve ser mudada para \'/carteira\' após o clique no botão.', () => {
    const { history } = renderWithRouterAndStore(<App />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const buttonLogin = screen.getByTestId('login-btn');

    userEvent.type(email, "admin@admin.com");
    userEvent.type(senha, "lolzinho");
    fireEvent.click(buttonLogin);

    expect(history.location.pathname).toBe('/carteira');
  });

  test('A rota deve ser mudada para \'/newuser\' após o clique no botão.', () => {
    const { history } = renderWithRouterAndStore(<App />);
    const buttonLogin = screen.getByTestId('newuser-btn');
    fireEvent.click(buttonLogin);

    expect(history.location.pathname).toBe('/newuser');
  });
});
