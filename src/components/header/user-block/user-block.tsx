import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import avatar from '../../../assets/image/svg/def-avatar.svg';
import { useTypedSelector } from '../../../store/hooks/use-typed-selector';
import { getAvatarSelector, getFirstNameSelector } from '../../../store/selectors/selectors';
import { PATH_AUTHORIZATION, PATH_PROFILE, URL_IMAGE } from '../../../utils/constants/path-url';
import { DEFAULT_NAME } from '../../../utils/constants/text';
import { logOut } from '../../../utils/helpers';

import styles from './user-block.module.css';

export const UserBlock = () => {
  const dispatch = useDispatch();
  const userName = useTypedSelector(getFirstNameSelector);
  const userAvatar = useTypedSelector(getAvatarSelector);
  const [stateContextMenu, setStateContextMenu] = useState(false);
  const toggleContextMenu = () => setStateContextMenu(!stateContextMenu);
  const clickLogOut = () => logOut(dispatch);
  return (
    <section className={styles.user} onClick={toggleContextMenu} onKeyUp={() => {}} role='button' tabIndex={0}>
      <h3 className={styles.greetings}>Привет, {userName ? userName : DEFAULT_NAME}!</h3>
      <img
        src={userAvatar ? `${URL_IMAGE}${userAvatar}` : `${avatar}`}
        className={styles.avatar}
        alt='avatar'
      />
      <div className={stateContextMenu ? styles['context-menu'] : `${styles['context-menu']} ${styles.hidden}`}>
        <NavLink to={PATH_PROFILE} data-test-id='profile-button'>
          Профиль
        </NavLink>
        <NavLink to={PATH_AUTHORIZATION} onClick={clickLogOut}>
          Выход
        </NavLink>
      </div>
    </section>
  );
};
