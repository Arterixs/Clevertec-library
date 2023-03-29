import styles from './title-profile.module.css';

export const TitleProfileBlock = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className={styles.wrapper}>
    <p className={styles.title}>{title}</p>
    <p className={styles.subtitle}>{subtitle}</p>
  </div>
);
