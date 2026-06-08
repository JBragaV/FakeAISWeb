import { getMetares } from '@/lib/api/redemet_services';
import type { InfosMeteorologicas } from '@/types/meteorologia';
import Titulo from '../components/titulo';
import CardLocalidade from '../components/card';

import style from './metar.module.css';
import Header from '../components/header';

export default async function Metar() {
  const metares: InfosMeteorologicas[] = await getMetares();

  return (
    <>
    <Header/>
      <h2 className={style.titulo_pagina_metar}>Metar das Proximidades</h2>
      <section className={style.grid_metar}>
          {metares.map((localidade) => (
            <CardLocalidade key={localidade.icao} meteorologia={localidade} />
          ))}
      </section>
    </>
  );
}
