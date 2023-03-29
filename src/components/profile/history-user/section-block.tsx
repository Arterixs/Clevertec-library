import { HISTORY_TITLE } from '../../../utils/constants/text';
import { TitleProfileBlock } from '../components/title/title-profile';

import styles from '../profile.module.css';

export const SectionBlock = ({
  children,
  title,
  subtitle,
}: {
  children: JSX.Element;
  title: string;
  subtitle: string;
}) => (
  <div className={styles['section-block']} data-test-id={title === HISTORY_TITLE ? 'history' : ''}>
    <TitleProfileBlock title={title} subtitle={subtitle} />
    {children}
  </div>
);
