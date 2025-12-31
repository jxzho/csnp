import { Box, Text } from 'ink'
import type { PropsBox } from '../types/ink'

export const TitledBox = ({
  title,
  children,
  ...propsBox
}: {
  title: string;
} & PropsBox) => {
  return (
    <Box>
      <Box {...propsBox}>{children}</Box>
      <Box position="absolute" marginLeft={4}>
        <Text color='#FF8373'> Code Snippet</Text>
        <Text dimColor> / {title} </Text>
      </Box>
    </Box>
  );
};
