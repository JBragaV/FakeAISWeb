import styles from './page.module.css';
import Metar from './metar/page';

export const revalidate = 300;

export default function Home() {
  return (
    <main className={styles.main}>
      <Metar />
    </main>
  );
}
