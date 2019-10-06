import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  LayoutAnimation
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CardTop from './CardTop';
import { Card, Button, Icon } from 'react-native-elements';

class FlipWordFront extends Component {

    renderCardContents() {
        return (
          <View>
            <CardTop
                userName={'Word Group'}
                lightColor={'#27AFFF'}
                darkColor={'#032269'}
                badgeText={'UPDATE'}
            />
            <View>
                <Text style={styles.updateText}>
                    Meaning: I am working on implementing Facebook Paper like interactions today.
                </Text>
                <Text style={styles.updateText}>
                    Sentence: I am working on implementing Facebook Paper like interactions today.
                </Text>
            </View>
            <View style={styles.reactionBox}>
                <Text 
                    style={[styles.reactionCount, { color: '#032269' }]}
                >
                    5 / 129
                </Text>
            </View>
          </View>
        );
    }

    render() {
        return (
            <View>
                <LinearGradient
                    colors={['#032269', '#27AFFF']}
                    style={{
                        width: Dimensions.get('window').width - 20,
                        marginTop: 20,
                        marginHorizontal: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        overflow: 'hidden',
                    }}
                >
                    {this.renderCardContents(this.props.data)}
                    </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    updateText: {
      fontSize: 16,
      color: 'white',
      backgroundColor: 'transparent',
      margin: 20,
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    reactionBox: {
      flex: 1,
      justifyContent: 'flex-end',
      margin: 40,
    },
    reactionEmoji: {
      textAlign: 'center',
      backgroundColor: 'transparent',
      fontSize: 40,
      padding: 5,
      textShadowRadius: 10,
      textShadowOffset: {
        width: 5,
        heigth: 5
      },
    },
    reactionCount: {
      textAlign: 'center',
      backgroundColor: 'transparent',
      fontSize: 22,
      padding: 8,
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });

export default FlipWordFront;
