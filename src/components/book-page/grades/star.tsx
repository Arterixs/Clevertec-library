export const Star = ({ dataTestId, href, className }: { dataTestId: string; href: string; className: string }) => (
  <svg className={className} data-test-id='star'>
    <use data-test-id={dataTestId} href={href} />
  </svg>
);
