import { PlugFlag } from '../../../../types/enum';

import styles from './plug.module.css';

export const Plug = ({
  title,
  subtitle,
  flag,
}: {
  flag: PlugFlag.NULL | PlugFlag.DELAY;
  title: string;
  subtitle?: string;
}) => (
  <div
    className={flag === PlugFlag.NULL ? `${styles.wrapper} ${styles.null}` : `${styles.wrapper} ${styles.delay}`}
    data-test-id={flag === PlugFlag.NULL ? 'empty-blue-card' : 'expired'}
  >
    <pre className={styles.title}>{title}</pre>
    {flag === PlugFlag.DELAY && <p className={styles.subtitle}>{subtitle}</p>}
  </div>
);
