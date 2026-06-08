import styles from './page.module.css';
import Metar from './metar/page';

export default function Home() {
  return (
    <main className={styles.main}>
      <Metar />
    </main>
  );
}
