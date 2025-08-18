'use client';

import classNames from 'clsx';
import { FC, memo, ReactNode, useRef, useState } from 'react';

import Edges from './Edges';

interface GradientButtonProps {
  label?: string | JSX.Element;
  customLabelRenderer?: (ref: any) => ReactNode;
  color: `#${string}`;
  gradient: string[];
  gradientPrecision?: number;
  gradientSpeed?: number;
  fill?: boolean;
  fillGradientIds?: string[];
  fillGradients?: JSX.Element[];
  isActive?: boolean;
  isDisabled?: boolean;
  isCentered?: boolean;
  background?: `#${string}`;
  backgroundActive?: `#${string}` | string;
  type?: 'button' | 'submit';
  icon?: React.ReactNode;
  onClickCallback?: () => void;
  className?: string;
  textContainerClassName?: string;
}

const GradientButton: FC<GradientButtonProps> = ({
  type,
  label,
  color,
  background,
  backgroundActive,
  gradient,
  gradientPrecision = 10,
  gradientSpeed = 50,
  isActive,
  customLabelRenderer,
  isDisabled,
  fillGradientIds,
  fillGradients,
  isCentered = false,
  icon,
  onClickCallback,
  className,
  textContainerClassName
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const onClick = () => {
    if (onClickCallback) {
      onClickCallback();
    }
  };

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };




  return (
    <button
      className={classNames(
        'GradientButton relative w-fit h-fit',
        className
      )}
      style={
        {
          '--color': color,
          '--background': background
        } as React.CSSProperties & { [key: string]: string }
      }
      type={type || 'button'}
      disabled={isDisabled}
      {...(!isDisabled && { onClick, onMouseEnter, onMouseLeave })}
    >
      <div className=" text-white">
         heeeey this is me 
      </div>
      <Edges
        fill={isActive ? backgroundActive : background}
        fillGradientIds={fillGradientIds}
        fillGradients={fillGradients}
        borderRadiusTopLeft={6}
        borderRadiusTopRight={6}
        borderRadiusBottomRight={6}
        borderRadiusBottomLeft={6}
        borderGradientResizeThrottleTime={200}
        gradient={gradient}
        gradientPrecision={gradientPrecision}
        speed={gradientSpeed}
      />
    </button>
  );
};

export default memo(GradientButton);
