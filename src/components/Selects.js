import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FloatingLabel, Stack } from 'react-bootstrap'; 

export default class Selects extends Component {
  render() {
    const { onChange } = this.props;
    return (
    <Stack direction="horizontal" gap={1}>
      <FloatingLabel controlId="floatingSelect" label="Pagamento:"> 
        <Form.Select
        name="method"
        id="method"
        data-testid="method-input"
        onChange={ onChange }
        aria-label="Método de pagamento"
      >
        <option value="">Selecione</option>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Tag:">
        <Form.Select
          name="tag"
          id="tag"
          data-testid="tag-input"
          onChange={ onChange }
        >
          <option value="">Selecione</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </Form.Select>
      </FloatingLabel>
    </Stack>
    );
  }
}

Selects.propTypes = {
  onChange: PropTypes.func.isRequired,
};
