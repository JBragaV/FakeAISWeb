import style from './corpo_card.module.css';

type props = {
  metar: string | undefined;
  taf: string | undefined;
};

export default function BodyCard({ metar, taf }: props) {
  return (
    <div className={`${style.container} ${style.visual}`}>
      <div>
        <p className={style.container__paragrafo}>
          {metar
            ? metar
            : 'METAR ausente da base de dados da REDEMET ou Aeroporto está fechado'}
        </p>
      </div>
      <hr />
      <div>
        <p className={style.container__paragrafo}>
          {taf ? taf : 'Em desenvolvimento o TAF'}
        </p>
      </div>
    </div>
  );
}
