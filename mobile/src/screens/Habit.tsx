import { RouteProp, useRoute, ParamListBase } from "@react-navigation/native";
import { View, ScrollView, Text } from "react-native";
import BackButton from "../components/BackButton";
import dayjs from "dayjs";
import ProgressBar from "../components/ProgressBar";
import Checkbox from "../components/Checkbox";

type HabitParams = ReactNavigation.RootParamList["habit"];

function Habit() {
    const route = useRoute();
    const { date } = route.params as HabitParams;

    const day = dayjs(date).utc();
    const dayOfWeek = day.format("dddd");
    const dayAndMonth = day.format("DD/MM");

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <BackButton />

            <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                {dayOfWeek}
            </Text>
            <Text className="text-white font-extrabold text-3xl">
                {dayAndMonth}
            </Text>

            <ProgressBar progress={70}></ProgressBar>

            <ScrollView className="mt-4">
                <Checkbox title="Beber 2L de Água"></Checkbox>
            </ScrollView>
        </View>
    )
}

export default Habit;
