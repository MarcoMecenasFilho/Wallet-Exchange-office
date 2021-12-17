import React from 'react';
import { screen} from '@testing-library/react';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndStore } from './testConfig';

const VALUE_INPUT_TEST_ID = 'value-input';
const EMAIL_INPUT_TEST_ID = 'email-input';
const CURRENCY_INPUT_TEST_ID = 'currency-input';
const METHOD_INPUT_TEST_ID = 'method-input';
const TAG_INPUT_TEST_ID = 'tag-input';
const DESCRIPTION_INPUT_TEST_ID = 'description-input';
const TOTAL_FIELD_TEST_ID = 'total-field';

afterEach(() => jest.clearAllMocks());

describe('Crie uma página para sua carteira com as seguintes características:', () => {
  test('A rota para esta página deve ser \'/carteira\'', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/carteira');
    const email = screen.queryByTestId(EMAIL_INPUT_TEST_ID);
    expect(email).toBeNull();
  });

})

describe('Crie um header para a página de carteira contendo as seguintes características:', () => {
  
  test('Crie um campo com a despesa total gerada pela lista de gastos.', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const totalField = screen.getByTestId(TOTAL_FIELD_TEST_ID);

    expect(totalField).toContainHTML('Valor total: R$0');
  });

  test('Crie um campo que mostre que qual câmbio está sendo utilizado, que será neste caso \'BRL\'', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const exchangeField = screen.getByTestId('header-currency-field');

    expect(exchangeField).toBeInTheDocument();
    expect(exchangeField).toContainHTML('BRL');
  });
});

describe('Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:', () => {
  test('Um campo para adicionar o valor da despesa', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const valueInput = await screen.findByTestId(VALUE_INPUT_TEST_ID);

    expect(valueInput).toBeInTheDocument();
  });

  test('Um campo para adicionar a descrição da despesa', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const descriptionInput = await screen.findByTestId(DESCRIPTION_INPUT_TEST_ID);

    expect(descriptionInput).toBeInTheDocument();
  });

  test('Um campo para selecionar em qual moeda será registrada a despesa', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const currencyInput = await screen.findByTestId(CURRENCY_INPUT_TEST_ID);

    expect(currencyInput).toBeInTheDocument();

  });

  test('Um campo para selecionar qual método de pagamento será utilizado', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const methodInput = await screen.findByTestId(METHOD_INPUT_TEST_ID);
    const moneyOption = screen.getByText(/Dinheiro/);
    const creditOption = screen.getByText(/Cartão de crédito/);
    const debitOption = screen.getByText(/Cartão de débito/);

    expect(methodInput).toBeInTheDocument();
    expect(moneyOption).toBeInTheDocument();
    expect(creditOption).toBeInTheDocument();
    expect(debitOption).toBeInTheDocument();
  });

  test('Um campo para selecionar uma categoria (tag) para a despesa.', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const tagInput = await screen.findByTestId(TAG_INPUT_TEST_ID);
    const foodOption = screen.getByText(/Alimentação/);
    const funOption = screen.getByText(/Lazer/);
    const workOption = screen.getByText(/Trabalho/);
    const transportOption = screen.getByText(/Transporte/);
    const healthOption = screen.getByText(/Saúde/);

    expect(tagInput).toBeInTheDocument();
    expect(foodOption).toBeInTheDocument();
    expect(funOption).toBeInTheDocument();
    expect(workOption).toBeInTheDocument();
    expect(transportOption).toBeInTheDocument();
    expect(healthOption).toBeInTheDocument();
  });

  test('Um botão com o texto \'Adicionar despesa\'', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const addButton = await screen.findByText(/Adicionar despesa/i);
    
    expect(addButton).toBeInTheDocument();

    
});

})