import { View } from 'react-native';

import { Text } from '~/components/ui/text';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const title = 'Open up the code for this screen:';
  const description =
    'Change any of the text, save the file, and your app will automatically update.';

  return (
    <View>
      <Text>{title}</Text>
      <View>
        <Text>{path}</Text>
      </View>
      <Text>{description}</Text>
    </View>
  );
};
