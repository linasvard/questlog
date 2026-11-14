import type { SVGProps } from 'react';

const NotFoundIcon = ({
  className = 'w-10 h-10',
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 395.17 174.12"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    shapeRendering="crispEdges"
    strokeLinejoin="miter"
    overflow="visible"
    className={className}
    aria-hidden="true"
    {...props}>
    <g>
      <path
        className="error-shadow"
        d="M65.38,174.12v-43.5H21.88v-10.87h-10.88V11h43.5v65.25h10.88V11h43.5v163.12H65.38Z"
      />
      <path
        className="error-shadow"
        d="M145.02,174.12v-10.87h-10.87V21.88h10.87v-10.88h116.13v10.88h10.87v141.37h-10.87v10.88H145.02ZM228.52,130.62V54.5h-50.87v76.12H228.52Z"
      />
      <path
        className="error-shadow"
        d="M351.67,174.12v-43.5h-43.5v-10.87h-10.87V11h43.5v65.25h10.87V11h43.5v163.12H351.67Z"
      />
    </g>
    <g>
      <path
        className="error-letter"
        d="M56.38,165.12v-43.5H12.88v-10.87H2V2h43.5v65.25h10.88V2h43.49v163.12H56.38Z"
      />
      <path
        className="error-letter"
        d="M136.02,165.12v-10.87h-10.87V12.88h10.87V2h116.13v10.88h10.87v141.37h-10.87v10.88H136.02ZM219.52,121.62V45.5h-50.87v76.12H219.52Z"
      />
      <path
        className="error-letter"
        d="M342.67,165.12v-43.5h-43.5v-10.87h-10.87V2h43.5v65.25h10.87V2h43.5v163.12H342.67Z"
      />
    </g>
  </svg>
);

export default NotFoundIcon;
