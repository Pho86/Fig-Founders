import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const FoodIcon = ({ color = '#808080', ...props }: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    {/* Top Bun (half-ellipse) */}
    <Path
      d="M2 9.5a10 4 0 0 1 20 0v1.5H2V6z"
      stroke={color} // Gray for the outline
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Patty (thicker gray fill, very slight gap) */}
    <Path
      d="M1 12h21v4H2v-4z"
      fill={color} // Gray fill for the patty
    />
    {/* Bottom Bun (half-ellipse, very slight gap) */}
    <Path
      d="M2 18a10 4 0 0 0 20 0v-1.5H2V16z"
      stroke={color} // Gray for the outline
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
