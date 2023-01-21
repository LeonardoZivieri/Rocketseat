import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import HabitDay, { DAY_SIZE } from "../components/HabitDay";
import { generateDatesFromLastQuarter } from "../utils/generate-dates-from-last-quarter";

const weekDays = 'DSTQQSS'.split("");

const sumaryDates = generateDatesFromLastQuarter();

function Home() {
    return (
        <View className="flex-1 bg-background px-8 pt-16 items-center text-white">
            <Header />
            <View className="flex-row mt-6 mb-2">
                {weekDays.map((weekDay, i) => (
                    <Text
                        key={`${weekDay}-${i}`}
                        className="mx-1 font-bold text-zinc-400 text-xl text-center"
                        style={{ width: DAY_SIZE }}
                    >
                        {weekDay}
                    </Text>
                ))}
            </View>
            <ScrollView>
                <View className="flex-row flex-wrap">
                    {sumaryDates.map(date => (
                        <HabitDay key={date.toJSON()} />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}


export default Home;
