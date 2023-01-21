import { TouchableOpacity, TouchableOpacityProps, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean;
  title?: string;
}
function Checkbox(props: CheckboxProps) {
  const {
    checked = false,
    title,
    className: propsClassName = "",
    ...restProps
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...restProps}
      className={propsClassName + "flex-row my-1 items-center"}
    >
      {checked ? (
        <View className="h-8 w-8 border border-green-300 bg-green-500 rounded-lg items-center justify-center">
          <Feather name="check" size={20} color={colors.white}></Feather>
        </View>
      ) : (
        <View className="h-8 w-8 border border-zinc-700 bg-zinc-900 rounded-lg items-center justify-center" />
      )}

      <Text className="ml-2 text-base font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Checkbox;
