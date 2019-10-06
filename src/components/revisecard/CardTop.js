import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

class CardTop extends Component {
  render() {
    const { data } = this.props;

    return (
      <View
        style={{ flexDirection: 'row' }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.displayName}>
            {data}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  displayName: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: 'white',
    marginTop: 22,
    fontSize: 20,
    marginBottom: 5,
  }
});

export default CardTop;
