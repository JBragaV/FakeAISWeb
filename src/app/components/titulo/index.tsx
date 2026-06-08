import style from './titulo.module.css';

type props = {
  titulo: string;
  caixa: boolean;
};

export default function Titulo({ titulo, caixa }: props) {
  return (
    <h2 className={style.titulos}>{caixa ? titulo.toUpperCase() : titulo}</h2>
  );
}
