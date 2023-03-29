import { UploadAvatar } from './upload-avatar/avatar';
import { UserName } from './user-name/user';

import styles from '../profile.module.css';

export const InfoUser = () => (
  <section className={styles['user-info']} data-test-id='profile-avatar'>
    <UploadAvatar />
    <UserName />
  </section>
);
