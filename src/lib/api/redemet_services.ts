import { RespostaApi } from '@/types/resposta_api';
import { InfosMeteorologicas } from '@/types/meteorologia';

import redeMetApi from './axios';

import aeroportos from '@/dados/aeroportos.json';

type data = {
  data: {
    data: RespostaApi[];
  };
};

const getKey = () => {
  const apiKey = process.env.API_REDEMET;
  if (!apiKey) {
    throw new Error('API_REDEMET não configurada');
  }

  return apiKey;
};

export const getMetares = async (): Promise<InfosMeteorologicas[]> => {
  const api_key = getKey();
  const jsonLocalidade = aeroportos;

  const icaos = aeroportos.map((localidade) => localidade.icao).join(',');
  const res = await redeMetApi.get<data>(
    `/mensagens/metar/${icaos}?api_key=${api_key}`,
  );

  const resposta = res.data.data.data;

  const resultado: InfosMeteorologicas[] = jsonLocalidade.map((aeroporto) => {
    const metar = resposta.find((m) => m.id_localidade === aeroporto.icao);

    // const taf = tafs.find(
    //     t => t.id_localidade === aeroporto.icao
    // );
    return {
      ...aeroporto,
      validade_inicial: metar?.validade_inicial ?? '',
      metar: metar?.mens ?? '',
      taf: '',
    };
  });
  return resultado;
};

export const metarSDCO = async () => {
  const res = await redeMetApi.get<data>(
    `/mensagens/metar/SDCO?api_key=${process.env.API_REDEMET}`,
  );
  const resposta = res.data.data.data;
  console.log('METAR SDCO');
  console.log(resposta);
};

export const getMetar = async (
  icao: string,
): Promise<RespostaApi | undefined> => {
  const res = await redeMetApi.get<data>(
    `/mensagens/metar/${icao}?api_key=${process.env.API_REDEMET}`,
  );
  const resposta = res.data.data.data;
  console.log('METAR SDCO');
  console.log(resposta);
  return resposta[0];
};
