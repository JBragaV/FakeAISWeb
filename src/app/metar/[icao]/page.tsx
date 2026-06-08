import { getMetar } from '@/lib/api/redemet_services';
import { notFound } from 'next/navigation';

import Titulo from '@/app/components/titulo';

type pageProps = {
  params: Promise<{
    icao: string;
  }>;
};

export const generateMetadata = async ({ params }: pageProps) => {
  const { icao } = await params;

  const resposta = await getMetar(icao);
  if (!resposta) return;

  return {
    title: `Metar de ${icao} | FAISWeb`,
    desciption: `METAR de ${icao}`,
    openGraph: {
      title: `Metar de ${icao} | FAISWeb`,
      desciption: `METAR de ${icao}`,
      images: [
        'https://cavappcontent.s3.amazonaws.com/n%20chuva-intensa-sorocaba-sp-sudeste-clima-ao-vivo-previsao-alerta-14-03-23-1678818562835.jpg',
      ],
    },
  };
};

export default async function Metar({ params }: pageProps) {
  const { icao } = await params;

  const resposta = await getMetar(icao);

  if (!resposta) {
    notFound();
  }

  const { mens } = resposta;
  console.log(resposta);
  console.log(mens);
  return (
    <div>
      <Titulo titulo={icao} caixa={true} />

      <p>{mens}</p>
    </div>
  );
}
