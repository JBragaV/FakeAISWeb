import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import BodyCard from '.';

describe('Testes do corpo do card', () => {
  it('Teste do BodyCard recebendo todas as informações', async () => {
    const metar = 'METAR SDCO 031300Z 11008KT 080V150 9999 FEW022 19/13 Q1027=';
    const taf = `TAF SDCO 030900Z 0312/0324 12006KT 8000 SCT013 TX23/0317Z TN16/0323Z BECMG 0312/0315 9999 SCT030 BECMG 0316/0318 12008KT BECMG 0320/0322 CAVOK RMK PHH=`;

    render(<BodyCard metar={metar} taf={taf} />);

    const elementoMetar = await screen.findByText(metar);
    const elementoTaf = await screen.findByText(taf);

    expect(elementoMetar).toBeInTheDocument();
    expect(elementoTaf).toBeInTheDocument();
  });

  it('Teste do Body recebendo apenas o METAR', async () => {
    const metar = 'METAR SDCO 031300Z 11008KT 080V150 9999 FEW022 19/13 Q1027=';
    const taf = ``;
    const tafAusente = 'Em desenvolvimento o TAF';

    render(<BodyCard metar={metar} taf={taf} />);

    const elementoMetar = await screen.findByText(metar);
    const elementoTaf = await screen.findByText(tafAusente);

    expect(elementoMetar).toBeInTheDocument();
    expect(elementoTaf).toBeInTheDocument();
  });

  it('Teste do Body recebendo apenas o TAF', async () => {
    const metar = '';
    const taf = `TAF SDCO 030900Z 0312/0324 12006KT 8000 SCT013 TX23/0317Z TN16/0323Z BECMG 0312/0315 9999 SCT030 BECMG 0316/0318 12008KT BECMG 0320/0322 CAVOK RMK PHH=`;

    const metarAusente =
      'METAR ausente da base de dados da REDEMET ou Aeroporto está fechado';

    render(<BodyCard metar={metar} taf={taf} />);

    const elementoMetar = await screen.findByText(metarAusente);
    const elementoTaf = await screen.findByText(taf);

    expect(elementoMetar).toBeInTheDocument();
    expect(elementoTaf).toBeInTheDocument();
  });

  it('Teste do Body não recebendo nenhuma informação', async () => {
    const metar = '';
    const taf = ``;

    const metarAusente =
      'METAR ausente da base de dados da REDEMET ou Aeroporto está fechado';
    const tafAusente = 'Em desenvolvimento o TAF';

    render(<BodyCard metar={metar} taf={taf} />);

    const elementoMetar = await screen.findByText(metarAusente);
    const elementoTaf = await screen.findByText(tafAusente);

    expect(elementoMetar).toBeInTheDocument();
    expect(elementoTaf).toBeInTheDocument();
  });
});
