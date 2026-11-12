import type { SVGProps } from 'react';

const QuestlogLogo = ({
  className = 'w-10 h-10',
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 99.29 131.26"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    shapeRendering="crispEdges"
    strokeLinejoin="miter"
    overflow="visible"
    className={className}
    aria-hidden="true"
    {...props}>
    <path
      className="cls-3"
      d="M81.79,96.26V.01H0s.01,8.75.01,8.75v78.75h0l.04,8.82,43.71-.07v35h55.53v-35H81.79ZM43.76,61.26h-8.75v-26.25h8.75V61.26Z"
    />
  </svg>
);

export default QuestlogLogo;
