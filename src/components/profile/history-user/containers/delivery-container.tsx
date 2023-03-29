import { useTypedSelector } from '../../../../store/hooks/use-typed-selector';
import { getDeliveryBookSelector, getDeliveryDateHandedTo } from '../../../../store/selectors/selectors';
import { PlugFlag } from '../../../../types/enum';
import {
  PLUG_DELIVERY,
  PLUG_DELIVERY_BAD_TITLE,
  PLUG_DELIVERY_SUBTITLE,
  REMINDER_DELIVERY,
} from '../../../../utils/constants/text';
import { calculateDateDelay, convertDateDelivery } from '../../../../utils/helpers';
import { CardBook } from '../../components/card-book/card-book';
import { Plug } from '../../components/plug/plug';

import styles from './container.module.css';

export const DeliveryContainer = () => {
  const deliveryBookInfo = useTypedSelector(getDeliveryBookSelector);
  const dileveryDateTo = useTypedSelector(getDeliveryDateHandedTo);
  const dateReturn = convertDateDelivery(dileveryDateTo);
  const dateDelay = calculateDateDelay(dileveryDateTo);

  return (
    <div className={styles['card-chronicle']}>
      {(!deliveryBookInfo || dateDelay) && (
        <Plug
          title={dateDelay ? PLUG_DELIVERY_BAD_TITLE : PLUG_DELIVERY}
          subtitle={PLUG_DELIVERY_SUBTITLE}
          flag={dateDelay ? PlugFlag.DELAY : PlugFlag.NULL}
        />
      )}
      <CardBook book={deliveryBookInfo}>
        <p className={styles.reminder}>
          {REMINDER_DELIVERY} {dateReturn}
        </p>
      </CardBook>
    </div>
  );
};
