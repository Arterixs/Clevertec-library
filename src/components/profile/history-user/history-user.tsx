import {
  BOOKING_SUBTITLE,
  BOOKING_TITLE,
  DELIVERY_SUBTITLE,
  DELIVERY_TITLE,
  HISTORY_SUBTITLE,
  HISTORY_TITLE,
} from '../../../utils/constants/text';

import { BookingContainer } from './containers/book-container';
import { DeliveryContainer } from './containers/delivery-container';
import { HistoryContainer } from './containers/history-container';
import { SectionBlock } from './section-block';

import styles from '../profile.module.css';

export const HistoryUser = () => (
  <section className={styles['users-chronicle']}>
    <SectionBlock title={BOOKING_TITLE} subtitle={BOOKING_SUBTITLE}>
      <BookingContainer />
    </SectionBlock>
    <SectionBlock title={DELIVERY_TITLE} subtitle={DELIVERY_SUBTITLE}>
      <DeliveryContainer />
    </SectionBlock>
    <SectionBlock title={HISTORY_TITLE} subtitle={HISTORY_SUBTITLE}>
      <HistoryContainer />
    </SectionBlock>
  </section>
);
