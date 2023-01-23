import { useState, useCallback } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import Checkbox from "../components/Checkbox";
import dayjs from "dayjs";
import { api } from "../lib/axios";

const capitalize = (str: string, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{\-])+\S/g, match => match.toUpperCase());
;
const availableWeekDays = Array.from({ length: 7 }).map((_, weekDay) => {
    return capitalize(dayjs(0).utc().startOf('week').add(weekDay, "days").format("dddd"));
})

function New() {

    const [title, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<boolean[]>([]);

    const handleToggleWeekDay = useCallback((weekDayIndex: number) => {
        weekDays[weekDayIndex] = !weekDays[weekDayIndex];
        setWeekDays([...weekDays]);
    }, [weekDays]);

    const handleCreateNewHabit = async () => {
        try {
            if (!title.trim()) {
                Alert.alert('Novo Hábito', 'Informe o nome do hábito');
                return;
            }
            if (weekDays.every(wk => wk === false)) {
                Alert.alert('Novo Hábito', 'Selecione a periodicidade');
                return;
            }

            const newHabit = {
                // Prevent 
                title: title.trim(),

                // Transform [true, false, true] in [0, 2]
                weekDays: weekDays.map((wd, i) => wd && i).filter(Boolean)
            };

            await api.post('/habits', newHabit);
            
            setTitle('');
            setWeekDays([]);

            Alert.alert('Novo Hábito', 'Novo hábito criado com sucesso');

        } catch (error) {
            Alert.alert('Ops!', 'Não foi possível criar o novo hábito');
            return;
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <BackButton />

            <Text className="mt-4 font-extrabold text-3xl">
                Criar hábito
            </Text>

            <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
                <Text className="font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 border border-zinc-800 focus:border-2 focus:border-green-600"
                    placeholder="Exercícios, dormir bem, etc..."
                    value={title}
                    onChangeText={setTitle}
                />

                <Text className="mt-4 mb-3 font-semibold text-base">
                    Qual a recorrência?
                </Text>
                {availableWeekDays.map((weekDay, index) => (
                    <Checkbox
                        key={weekDay}
                        title={weekDay}
                        checked={weekDays[index]}
                        onPress={() => handleToggleWeekDay(index)}
                    />
                ))}
            </ScrollView>

            <TouchableOpacity
                className="w-full h-14 my-4 flex-row items-center justify-center rounded-md bg-green-600"
                activeOpacity={0.7}
                onPress={handleCreateNewHabit}
            >
                <Feather name="check" size={20}></Feather>
                <Text className="font-semibold text-base ml-2">
                    Salvar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default New;
