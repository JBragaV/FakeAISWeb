import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Metar from '@/app/metar/page';

import { getMetares } from '@/lib/api/redemet_services';

jest.mock('../lib/api/redemet_services', () => ({
  getMetares: jest.fn(),
}));

describe('Teste do Card', () => {
  test('Renderizando o card da localidade com metar', async () => {
    const resposta = [
      {
        icao: 'SBGR',
        metar: 'METAR SBGR 031400Z 06008KT 9999 BKN023 20/13 Q1028=',
        taf: '',
        validade_inicial: '2026-06-03 14:00:00',
        foto: 'aeroportos/garulhos.jpg',
      },
    ];

    (getMetares as jest.Mock).mockResolvedValue(resposta);

    const page = await Metar()
    render(page);

    expect(getMetares).toHaveBeenCalledTimes(1);

    const cards = screen.getAllByRole('img');

    const elementotitulo = await screen.findByText('Metar das Proximidades');
    const elementoIcao = await screen.findByText('SBGR');
    const elementoMetar = await screen.findByText(
      'METAR SBGR 031400Z 06008KT 9999 BKN023 20/13 Q1028=',
    );
    const elementoFoto = screen.getByRole('img');

    expect(cards).toHaveLength(1);
    expect(elementotitulo).toBeInTheDocument();
    expect(elementoIcao).toBeInTheDocument();
    expect(elementoMetar).toBeInTheDocument();
    expect(elementoFoto.getAttribute('src')).toContain('aeroportos');
    expect(elementoFoto.getAttribute('src')).toContain('garulhos.jpg');
  });
});
