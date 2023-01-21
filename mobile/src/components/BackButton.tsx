import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import colors from 'tailwindcss/colors'

interface BackButtonProps extends TouchableOpacityProps {
}

function BackButton(props: BackButtonProps) {
  const { goBack } = useNavigation();

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      onPress={goBack}
    >
      <Feather name="arrow-left" size={32} color={colors.zinc["400"]}></Feather>
    </TouchableOpacity>
  )
}

export default BackButton;
