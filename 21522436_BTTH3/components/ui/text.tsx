import * as Slot from '@rn-primitives/slot';
import { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

import { cn } from '~/lib/utils';
import { useFontSize } from '~/provider/FontSizeProvider'; // Import hook để lấy kích thước phông chữ

const TextClassContext = React.createContext<string | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const { fontSize } = useFontSize(); // Lấy kích thước phông chữ từ context
    const Component = asChild ? Slot.Text : RNText;

    // Tính toán lineHeight dựa trên fontSize
    const computedLineHeight = fontSize * 1.4;

    return (
      <Component
        className={cn('text-base text-foreground web:select-text', textClass, className)}
        ref={ref}
        style={[{ fontSize, lineHeight: computedLineHeight }, style]} // Thêm lineHeight vào style
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, TextClassContext };
