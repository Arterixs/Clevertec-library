import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { EditProfile } from '../../components/profile/edit/edit-profile';
import { HistoryUser } from '../../components/profile/history-user/history-user';
import { InfoUser } from '../../components/profile/profile-header/info-user';
import { requestMainPageData } from '../../utils/helpers';

import styles from './profile.module.css';

export const Profile = () => {
  const dispatch = useDispatch();
  const didLogRef = useRef(false);

  useEffect(() => {
    if (!didLogRef.current) {
      requestMainPageData(dispatch);
    }
    didLogRef.current = true
  }, [dispatch, didLogRef]);

  return (
    <main className={styles.main}>
      <div className={styles['main-wrap']}>
        <section className={styles.profile}>
          <InfoUser />
          <EditProfile />
          <HistoryUser />
        </section>
      </div>
    </main>
  );
};
