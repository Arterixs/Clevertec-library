import { IBackLightProps } from '../../types/interface/interface';

export const BackLight = (props: IBackLightProps) => {
  const { valueInput, valueTitle } = props;

  if (!valueInput) return <span>{valueTitle}</span>;
  const regExp = new RegExp(valueInput, 'ig');
  const matchValue = valueTitle.match(regExp);

  if (matchValue) {
    const arraySymbols = valueTitle.split(regExp);
    const arraySearchBackLight = arraySymbols.map((item, index, array) => {
      if (index < array.length - 1) {
        const symbols = matchValue.shift();

        return (
          <>
            {item}
            <span data-test-id='highlight-matches' className='backLight'>
              {symbols}
            </span>
          </>
        );
      }

      return <span>{item}</span>;
    });

    return <span>{arraySearchBackLight}</span>;
  }

  return <span>{valueTitle}</span>;
};
