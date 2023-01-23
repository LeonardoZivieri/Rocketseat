import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import HabitDay, { DAY_SIZE } from "../components/HabitDay";
import { generateDatesFromLastQuarter } from "../utils/generate-dates-from-last-quarter";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import Loading from "../components/Loading";
import dayjs from "dayjs";

const weekDays = 'DSTQQSS'.split("");

const sumaryDates = generateDatesFromLastQuarter();

const v = [{"id":"62e8eb01-3c66-4b45-8fdb-05cd866101ea","date":"2023-01-06T00:00:00.000Z","completed":1,"amount":1},{"id":"6a6f71f5-0af0-4c2a-ae54-f9a5acf1b4d3","date":"2023-01-02T00:00:00.000Z","completed":1,"amount":1},{"id":"2e625857-5655-4607-af09-9c7974dae448","date":"2023-01-04T00:00:00.000Z","completed":2,"amount":2},{"id":"c4e2e6c3-890c-4c0c-9f13-aa986474ba0f","date":"2023-01-21T00:00:00.000Z","completed":1,"amount":1}]
type SummaryData = {
    id: string;
    date: string;
    completed: number;
    amount: number;
}[];

function Home() {
    const { navigate } = useNavigation();

    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<SummaryData>();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get("/summary");
            setSummary(response.data);
        } catch (error) {
            Alert.alert("Ops!", error instanceof Error ? error.message : "Nao foi possível carregar o sumário de hábitos");
            console.error(error)
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <Loading></Loading>
        )
    }

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
                    {sumaryDates.map(date => {

                        const dayWithHabits = summary?.find((day) => (
                            dayjs(date).isSame(day.date, 'day')
                        ))

                        return (
                            <HabitDay
                                date={date}
                                amount={dayWithHabits?.amount}
                                completed={dayWithHabits?.completed}
                                key={date.toJSON()}
                                onPress={() => navigate("habit", { date: date.toJSON() })}
                            />
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}


export default Home;
