import Image from 'next/image';

import style from './imagem.module.css';

type props = {
  icao: string;
  PathImg: string;
  prioridade: boolean;
};

export default function ImageCard({ PathImg, icao, prioridade }: props) {
  return (
    <Image
      className={style.card__imagem}
      src={PathImg ? PathImg : 'foto_generica.jpg'}
      alt={`Foto de ${icao}`}
      priority={prioridade}
      fill
      sizes="
        (max-width: 767px) 90vw,
        (max-width: 1279px) 45vw,
        30vw
      "
    />
  );
}
