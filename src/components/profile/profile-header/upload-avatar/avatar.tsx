import { useDispatch } from 'react-redux';

import avatar from '../../../../assets/image/svg/avatar.svg';
import { useTypedSelector } from '../../../../store/hooks/use-typed-selector';
import { getAvatarSelector, userIdSelector } from '../../../../store/selectors/selectors';
import { URL_IMAGE } from '../../../../utils/constants/path-url';
import { requestNewAvatar } from '../../../../utils/helpers';

import styles from './avatar.module.css';

export const UploadAvatar = () => {
  const dispatch = useDispatch();
  const userAvatar = useTypedSelector(getAvatarSelector);
  const userId = useTypedSelector(userIdSelector);

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !userId) return;
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('files', file);
    requestNewAvatar(formData, dispatch, userId);
  };

  return (
    <form>
      <input style={{ display: 'none' }} type='file' name='files' id='set-avatar' onChange={onChangePicture} />
      <label className={styles['container-avatar']} htmlFor='set-avatar'>
        <img src={userAvatar ? `${URL_IMAGE}${userAvatar}` : `${avatar}`} className={styles.avatar} alt='avatar' />
        <svg className={styles.svg}>
          <use href='#foto' />
        </svg>
        <svg className={styles.camera}>
          <use href='#camera' />
        </svg>
      </label>
    </form>
  );
};
