import Image from 'next/image';

import style from './imagem.module.css';

type props = {
  icao: string;
  PathImg: string;
};

export default function ImageCard({ PathImg, icao }: props) {
  return (
    <Image
      className={style.card__imagem}
      src={PathImg ? PathImg : 'foto_generica.jpg'}
      alt={`Foto de ${icao}`}
      width={800}
      height={300}
      priority
    />
  );
}
