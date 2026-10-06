import {
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { colors } from '../../constants/colors';
import { theme } from '../../constants/theme';

type AppButtonProps = {
  title: string;
  onPress: () => void;
};

export const AppButton = ({
  title,
  onPress,
}: AppButtonProps) => {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: theme.radius.medium,
    alignItems: 'center',
  },

  text: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.button,
    fontWeight: 'bold',
  },
});