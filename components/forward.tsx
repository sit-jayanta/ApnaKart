/* eslint-disable prettier/prettier */
import * as React from "react";
import Svg, {Path} from 'react-native-svg';

function ForwardArrow(props : any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6z"
        fill="#9B9B9B"
      />
    </Svg>
  );
}

export default ForwardArrow;