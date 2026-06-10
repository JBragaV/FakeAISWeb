import BodyCard from '../corpo_card';
import ImageCard from '../imagens';
import Titulo from '../titulo';

import { InfosMeteorologicas } from '@/types/meteorologia';

import style from './card.module.css';

type cardProp = {
  meteorologia: InfosMeteorologicas;
  prioridade: boolean;
};

export default function CardLocalidade({ meteorologia, prioridade }: cardProp) {
  return (
    <div className={style.card}>
      <div className={style.card__header}>
        <Titulo titulo={meteorologia.icao} caixa={true} />
        <ImageCard
          PathImg={meteorologia.foto ?? ''}
          icao={meteorologia.icao}
          prioridade={prioridade}
        />
      </div>
      <BodyCard metar={meteorologia.metar} taf={meteorologia.taf} />
    </div>
  );
}
