import React from 'react'
import { SafeAreaView, StyleSheet, View,Text } from 'react-native'

function EventDetail() {
    const styles = StyleSheet.create({
        safe_area_view: {
            flex:1,
        },
    })
  return (
      <SafeAreaView style={styles.safe_area_view}>
          <View>
              <Text>Event Detail</Text>
      </View>
      </SafeAreaView>
  )
}

export default EventDetail