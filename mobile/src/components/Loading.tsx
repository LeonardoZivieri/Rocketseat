import { ActivityIndicator, StyleSheet, View } from "react-native";

function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator color="#7C3AED" size={100}></ActivityIndicator>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Loading;
