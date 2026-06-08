import BodyCard from '../corpo_card';
import ImageCard from '../imagens';
import Titulo from '../titulo';

import { InfosMeteorologicas } from '@/types/meteorologia';

import style from './card.module.css';

type cardProp = {
  meteorologia: InfosMeteorologicas;
};

export default function CardLocalidade({ meteorologia }: cardProp) {
  return (
    <div className={style.card}>
      <div className={style.card__header}>
        <Titulo titulo={meteorologia.icao} caixa={true} />
        <ImageCard PathImg={meteorologia.foto ?? ''} icao={meteorologia.icao} />
      </div>
      <BodyCard metar={meteorologia.metar} taf={meteorologia.taf} />
    </div>
  );
}
