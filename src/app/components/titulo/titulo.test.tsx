import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Titulo from '.';

describe('Teste que verifica so o título será exibido corretamente', () => {
  it('Teste do elemento em caixa alta', async () => {
    const titulo = 'sdco';
    const caixa = true;

    render(<Titulo titulo={titulo} caixa={caixa} />);

    const elemento = await screen.findByText(titulo.toUpperCase());

    expect(elemento).toBeInTheDocument();
  });

  it('Teste do elemento em caixa baixa', async () => {
    const titulo = 'sdco';
    const caixa = false;

    render(<Titulo titulo={titulo} caixa={caixa} />);

    const elemento = await screen.findByText(titulo);

    expect(elemento).toBeInTheDocument();
  });
});
