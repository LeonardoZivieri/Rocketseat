import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons"
import colors from 'tailwindcss/colors'

import Logo from '../assets/logo.svg';


interface ProgressBarProps {
  progress?: number
}

function ProgressBar(props: ProgressBarProps) {
  const {
    progress = 0,
  } = props

  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <View
        className="h-3 rounded-xl bg-violet-600"
        style={{ width: `${progress}%` }}
      />
    </View>
  )

}

export default ProgressBar;
