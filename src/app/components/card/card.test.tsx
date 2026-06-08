import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CardLocalidade from '.';

describe('Teste do Card', () => {
  it('Renderizando o card da localidade com metar', async () => {
    const infosMeteorologicas = {
      icao: 'SBGR',
      metar: 'METAR SBGR 031400Z 06008KT 9999 BKN023 20/13 Q1028=',
      taf: '',
      validade_inicial: '2026-06-03 14:00:00',
      foto: '/aeroportos/garulhos.jpg',
    };

    render(<CardLocalidade meteorologia={infosMeteorologicas} />);

    const elementoIcao = await screen.findByText(infosMeteorologicas['icao']);
    const elementoMetar = await screen.findByText(infosMeteorologicas['metar']);
    const elementoFoto = screen.getByRole('img');

    expect(elementoIcao).toBeInTheDocument();
    expect(elementoMetar).toBeInTheDocument();
    expect(elementoFoto.getAttribute('src')).toContain('aeroportos');
    expect(elementoFoto.getAttribute('src')).toContain('garulhos.jpg');
  });
});
