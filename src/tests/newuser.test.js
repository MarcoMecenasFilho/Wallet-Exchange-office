import React from 'react';
import userEvent from '@testing-library/user-event';
import {  screen } from '@testing-library/react';
import NewUser from '../pages/NewUser';

import { renderWithRouterAndStore } from './testConfig';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '123456';
const INVALID_EMAIL_0 = 'email';
const INVALID_EMAIL_1 = 'email@com@';
const INVALID_EMAIL_3 = 'alguem@email.';
const INVALID_PASSWORD = '23456';

afterEach(() => jest.clearAllMocks());

describe.only('1 - Crie uma página de novo usuário com os seguintes campos e características:', () => {

  test('Crie um local para que o usuário insira seu email e senha', () => {
    renderWithRouterAndStore(<NewUser />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });

  test('Crie botão com data-testid "newuser-btn"', () => {
    renderWithRouterAndStore(<NewUser />);

    const buttonNewUser = screen.getByTestId('newuser-btn');
    expect(buttonNewUser).toBeInTheDocument();
  });

  test('Realize as seguintes verificações nos campos de email, senha e botão:', () => {
    renderWithRouterAndStore(<NewUser />);

    const buttonNewUser = screen.getByTestId('newuser-btn');
    expect(buttonNewUser).toBeDisabled();

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, INVALID_EMAIL_0);
    userEvent.type(senha, VALID_PASSWORD);
    expect(buttonNewUser).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL_1);
    userEvent.type(senha, VALID_PASSWORD);
    expect(buttonNewUser).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL_3);
    userEvent.type(senha,INVALID_PASSWORD);
    expect(buttonNewUser).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL_3);
    userEvent.type(senha, VALID_PASSWORD);
    expect(buttonNewUser).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(buttonNewUser).toBeEnabled();
  });


});
