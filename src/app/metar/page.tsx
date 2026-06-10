import { getMetares } from '@/lib/api/redemet_services';
import type { InfosMeteorologicas } from '@/types/meteorologia';
import CardLocalidade from '../components/card';

import style from './metar.module.css';
import Header from '../components/header';

export const revalidate = 300;

export default async function Metar() {
  const metares: InfosMeteorologicas[] = await getMetares();

  return (
    <>
      <Header />
      <h2 className={style.titulo_pagina_metar}>Metar das Proximidades</h2>
      <section className={style.grid_metar}>
        {metares.map((localidade, i) => {
          return (
            <CardLocalidade
              key={localidade.icao}
              meteorologia={localidade}
              prioridade={i === 0}
            />
          );
        })}
      </section>
    </>
  );
}
