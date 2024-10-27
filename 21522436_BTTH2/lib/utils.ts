import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mergeProps(slotProps: Record<string, any>, childProps: Record<string, any>) {
  const mergedProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);

    if (isHandler) {
      mergedProps[propName] = (...args: any[]) => {
        if (childPropValue) childPropValue(...args);
        if (slotPropValue) slotPropValue(...args);
      };
    } else if (propName === 'style') {
      mergedProps[propName] = combineStyles(slotPropValue, childPropValue);
    } else if (propName === 'className') {
      mergedProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    } else {
      mergedProps[propName] = slotPropValue !== undefined ? slotPropValue : childPropValue;
    }
  }

  return { ...slotProps, ...mergedProps };
}

// Function to combine
export function combineStyles(slotStyle: any, childValue: any) {
  // Combine styles based on your requirements
  return [slotStyle, childValue].filter(Boolean);
}

// Function to compose
export function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]): (node: T | null) => void {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}

export function isTextChildren(children: any) {
  return typeof children === 'string' || typeof children === 'number';
}
