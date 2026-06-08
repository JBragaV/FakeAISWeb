import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ImageCard from '.';

describe('Testes do elemento da imagem do card', () => {
  it('Teste quando for enviada o caminho da imagem', () => {
    const caminho = 'imagem_recebida.jpg';
    const icao = 'sdco';
    render(<ImageCard PathImg={caminho} icao={icao} />);

    const elementoCaminho = screen.getByRole('img');
    const elementoAlt = screen.getByAltText(`Foto de ${icao}`);

    expect(elementoCaminho.getAttribute('src')).toContain(`${caminho}`);
    expect(elementoAlt).toHaveAttribute('alt', `Foto de ${icao}`);
  });

  it('Teste quando for NÃO enviada o caminho da imagem', async () => {
    const caminho = '';
    const icao = 'sdco';
    render(<ImageCard PathImg={caminho} icao={icao} />);

    const elementoCaminho = screen.getByRole('img');
    const elementoAlt = screen.getByAltText(`Foto de ${icao}`);

    expect(elementoCaminho.getAttribute('src')).toContain('foto_generica.jpg');
    expect(elementoAlt).toHaveAttribute('alt', `Foto de ${icao}`);
  });
});
