import { USER_EDIT_SUBTITLE, USER_EDIT_TITLE } from '../../../utils/constants/text';
import { TitleProfileBlock } from '../components/title/title-profile';

import { FormEdit } from './form/form-edit';

import styles from '../profile.module.css';

export const EditProfile = () => (
  <section className={styles['user-edit']}>
    <TitleProfileBlock title={USER_EDIT_TITLE} subtitle={USER_EDIT_SUBTITLE} />
    <FormEdit />
  </section>
);
