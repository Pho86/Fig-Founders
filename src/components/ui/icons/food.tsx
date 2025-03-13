import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const FoodIcon = ({ color = '#1A1A1A', ...props }: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      d="M12 2C8.43001 2 5.23001 3.54 3.01001 6L12 22L20.99 6C18.78 3.55 15.57 2 12 2ZM12 17.92L5.51001 6.36C7.32001 4.85 9.62001 4 12 4C14.38 4 16.68 4.85 18.49 6.36L12 17.92ZM9.00001 5.5C8.17001 5.5 7.50001 6.17 7.50001 7C7.50001 7.83 8.17001 8.5 9.00001 8.5C9.83001 8.5 10.5 7.83 10.5 7C10.5 6.17 9.82001 5.5 9.00001 5.5ZM10.5 13C10.5 13.83 11.17 14.5 12 14.5C12.82 14.5 13.5 13.83 13.5 13C13.5 12.17 12.82 11.5 12 11.5C11.18 11.5 10.5 12.17 10.5 13Z"
      fill={color}
    />
  </Svg>
);
