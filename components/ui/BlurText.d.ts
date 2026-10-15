import { CSSProperties, ElementType } from 'react';

export interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, any>;
  animationTo?: Array<Record<string, any>>;
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  startDelay?: number;
  as?: ElementType;
  spanClassName?: string | ((segment: string, index: number) => string);
  style?: CSSProperties;
}

declare const BlurText: React.FC<BlurTextProps>;
export default BlurText;
