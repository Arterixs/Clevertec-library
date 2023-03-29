import { GradeEmpty } from '../components/book-page/grades/grade-empty';
import { GradeFull } from '../components/book-page/grades/grade-full';

export const getStars = (amountStars: number) => {
  const arrStars = [];
  const maxStars = 5;

  for (let i = 0; i < maxStars; i += 1) {
    if (i < amountStars) {
      const object = {
        element: <GradeFull />,
        id: i + 1,
        href: '#star-full',
        dataTestId: 'star-active',
      };

      arrStars.push(object);
    } else {
      const object = {
        element: <GradeEmpty />,
        id: i + 1,
        href: '#star-empty',
        dataTestId: '',
      };

      arrStars.push(object);
    }
  }

  return arrStars;
};
