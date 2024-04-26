import React from 'react'
import { SafeAreaView, Text, ActivityIndicator, StyleSheet, StatusBar } from 'react-native'
function Loader() {
    const styles = StyleSheet.create({
        activity_indicator: {
            flex: 1,
            backgroundColor: "#f5f5f5",
            paddingTop: StatusBar.currentHeight,
            justifyContent: 'center',
            alignItems:'center'
        },
    })
  return (
    <SafeAreaView style={styles.activity_indicator}>
            <ActivityIndicator size="large"  color='0000ff' />        
            <Text>Loading ...</Text>
    </SafeAreaView>
  )
}

export default Loader