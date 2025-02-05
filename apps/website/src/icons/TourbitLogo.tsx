import * as React from "react";
import type { SVGProps } from "react";
export const TourbitLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <rect width={45} height={45} fill="#000" rx={15} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M18.333 11h-4.889C12.094 11 11 12.045 11 13.333V18c0 1.289 1.094 2.333 2.444 2.333h4.89c1.35 0 2.444-1.044 2.444-2.333v-4.667c0-1.288-1.095-2.333-2.445-2.333M15.889 20.333V25c0 .619.257 1.212.716 1.65s1.08.683 1.728.683h4.89"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M30.556 22.667h-4.89c-1.35 0-2.444 1.044-2.444 2.333v4.667c0 1.288 1.095 2.333 2.445 2.333h4.889C31.906 32 33 30.955 33 29.667V25c0-1.289-1.094-2.333-2.444-2.333"
    />
  </svg>
);
