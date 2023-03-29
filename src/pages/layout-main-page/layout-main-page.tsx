import { Outlet } from 'react-router-dom';

import { Aside } from '../../components/main-page/aside';

export const LayoutMainPage = () => (
  <section className='main'>
    <div className='main__wrap'>
      <Aside />
      <Outlet />
    </div>
  </section>
);
