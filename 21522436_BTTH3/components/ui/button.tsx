import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable } from 'react-native';

import { TextClassContext } from '~/components/ui/text';
import { cn } from '~/lib/utils';
import { useFontSize } from '~/provider/FontSizeProvider';

const buttonVariants = cva(
  'group flex flex-row items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary web:hover:opacity-90 active:opacity-90',
        destructive: 'bg-destructive web:hover:opacity-90 active:opacity-90',
        outline:
          'border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        secondary: 'bg-secondary web:hover:opacity-80 active:opacity-80',
        ghost: 'web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        'extra-ghost': '',
        link: 'web:underline-offset-4 web:hover:underline web:focus:underline ',
      },
      size: {
        default: 'h-12 px-4 py-2 native:h-12 native:px-5 native:py-3',
        sm: 'h-9 rounded-md px-3',
        'extra-sm': 'h-8 px-2 py-1',
        lg: 'h-11 rounded-md px-6 native:h-14',
        icon: 'h-10 w-10 native:h-12 native:w-12 max-w-20 max-h-20', // thêm max h, max-w
        'icon-lg': 'h-11 w-11 native:h-13 native:w-13',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  'web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        outline: 'group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        'extra-ghost': '',
        link: 'text-primary group-active:underline',
      },
      size: {
        default: '',
        sm: '',
        'extra-sm': 'text-xs',
        lg: 'native:text-lg',
        icon: '',
        'icon-lg': 'native:text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const { fontSize } = useFontSize();
    const buttonClassName = cn(
      props.disabled && 'opacity-50 web:pointer-events-none',
      buttonVariants({ variant, size, className })
    );

    // Find width class
    const widthClass = buttonClassName
      .split(' ')
      .reverse()
      .find((cls) => cls.startsWith('w-'));
    const heightClass = buttonClassName
      .split(' ')
      .reverse()
      .find((cls) => cls.startsWith('h-'));

    const widthValue = widthClass ? parseInt(widthClass.replace('w-', ''), 10) : undefined;
    const calculatedWidth = widthValue ? (fontSize / 4) * widthValue : undefined;
    const heightValue = heightClass ? parseInt(heightClass.replace('h-', ''), 10) : undefined;
    const calculatedHeight = heightValue ? (fontSize / 4) * heightValue : undefined;

    return (
      <TextClassContext.Provider
        value={cn(
          props.disabled && 'web:pointer-events-none',
          buttonTextVariants({ variant, size })
        )}>
        <Pressable
          className={buttonClassName}
          ref={ref}
          role="button"
          style={{
            height: calculatedHeight,
            width: calculatedWidth,
          }}
          {...props}
        />
      </TextClassContext.Provider>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };