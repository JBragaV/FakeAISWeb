import { RespostaApi } from '@/types/resposta_api';
import redeMetApi from './axios';
import { getMetares } from './redemet_services';

jest.mock('./axios');

test('Testando a resposta da Api getMetares', async () => {
  // AAA
  // Arrange
  const dataEntrada: RespostaApi[] = [
    {
      id_localidade: 'SDCO',
      mens: 'METAR SDCO 031500Z 10010KT 070V130 9999 FEW030 21/13 Q1027=',
      validade_inicial: '2026-06-03 15:00:00',
      recebimento: '2026-06-03 15:00:00',
    },
    {
      id_localidade: 'SBJD',
      mens: 'METAR SBJD 031500Z 13010KT 080V170 9999 FEW025 22/14 Q1026=',
      validade_inicial: '2026-06-03 15:00:00',
      recebimento: '2026-06-03 15:00:00',
    },
    {
      id_localidade: 'SBMT',
      mens: '',
      validade_inicial: '2026-06-03 15:00:00',
      recebimento: '2026-06-03 15:00:00',
    },
    {
      id_localidade: 'SDAM',
      mens: '',
      validade_inicial: '2026-06-03 15:00:00',
      recebimento: '2026-06-03 15:00:00',
    },
    {
      id_localidade: 'SBJH',
      mens: 'METAR SBJH 031500Z 10011KT 9999 FEW030 21/13 Q1024=',
      validade_inicial: '2026-06-03 15:00:00',
      recebimento: '2026-06-03 15:00:00',
    },
    {
      id_localidade: 'SBSP',
      mens: 'METAR SBSP 031500Z 09006KT 060V120 9999 SCT036 19/12 Q1028=',
      validade_inicial: '2026-06-03 15:00:00',
      recebimento: '2026-06-03 15:00:00',
    },
    {
      id_localidade: 'SBGR',
      mens: 'METAR SBGR 031500Z 08007KT 9999 BKN026 20/13 Q1028=',
      validade_inicial: '2026-06-03 15:00:00',
      recebimento: '2026-06-03 15:00:00',
    },
  ];
  const data = [
    {
      icao: 'SDCO',
      metar: 'METAR SDCO 031500Z 10010KT 070V130 9999 FEW030 21/13 Q1027=',
      taf: '',
      validade_inicial: '2026-06-03 15:00:00',
      foto: '/aeroportos/sorocaba.avif',
      cidade: 'Sorocaba',
      uf: 'SP',
    },
    {
      cidade: 'São Paulo/Marte',
      foto: '/aeroportos/marte.avif',
      icao: 'SBMT',
      metar: '',
      taf: '',
      uf: 'SP',
      validade_inicial: '2026-06-03 15:00:00',
    },
    {
      icao: 'SBJD',
      metar: 'METAR SBJD 031500Z 13010KT 080V170 9999 FEW025 22/14 Q1026=',
      taf: '',
      validade_inicial: '2026-06-03 15:00:00',
      foto: '/aeroportos/jundiai.avif',
      cidade: 'Jundiaí',
      uf: 'SP',
    },
    {
      icao: 'SDAM',
      metar: '',
      taf: '',
      validade_inicial: '2026-06-03 15:00:00',
      foto: '/aeroportos/amarais.avif',
      cidade: 'Amarais',
      uf: 'SP',
    },
    {
      icao: 'SBJH',
      metar: 'METAR SBJH 031500Z 10011KT 9999 FEW030 21/13 Q1024=',
      taf: '',
      validade_inicial: '2026-06-03 15:00:00',
      foto: '/aeroportos/catarina.avif',
      cidade: 'Catarina',
      uf: 'SP',
    },
    {
      icao: 'SBSP',
      metar: 'METAR SBSP 031500Z 09006KT 060V120 9999 SCT036 19/12 Q1028=',
      taf: '',
      validade_inicial: '2026-06-03 15:00:00',
      foto: '/aeroportos/congonhas.avif',
      cidade: 'São Paulo/Congonhas',
      uf: 'SP',
    },
    {
      icao: 'SBGR',
      metar: 'METAR SBGR 031500Z 08007KT 9999 BKN026 20/13 Q1028=',
      taf: '',
      validade_inicial: '2026-06-03 15:00:00',
      foto: '/aeroportos/guarulhos.avif',
      cidade: 'Guarulhos',
      uf: 'SP',
    },
  ];
  const respostaApiMock = {
    data: {
      data: {
        data: dataEntrada,
      },
    },
  };
  (redeMetApi.get as jest.Mock).mockResolvedValue(respostaApiMock);
  // Act
  const metares = await getMetares();
  // Assert
  expect(metares).toEqual(data);
});
