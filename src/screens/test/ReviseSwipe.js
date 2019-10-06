import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Platform, Text } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import ReviseFlip from './ReviseFlip';

const reviseData = [
    { id: "1", listNo: "1", easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: "2", listNo: "2", easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: "3", listNo: "3", easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: "4", listNo: "4", easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: "5", listNo: "5", easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: "6", listNo: "6", easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: "7", listNo: "7", easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: "8", listNo: "8", easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: "9", listNo: "9", easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: "10", listNo: "10", easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: "11", listNo: "11", easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: "12", listNo: "12", easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: "13", listNo: "13", easy: 5, medium: 70, hard: 9, notAdded: 30 },
    { id: "14", listNo: "14", easy: 5, medium: 70, hard: 9, notAdded: 30 }
  ];

const { width: screenWidth } = Dimensions.get('window');

class ReviseSwipe extends Component {

    shouldComponentUpdate() {
        return false;
    }

    renderItem({ item, index }) {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                />
                <ReviseFlip
                    list={item.listNo}
                />
            </View>
        );
    }

    render() {
        return (
            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={reviseData}
                renderItem={this.renderItem}
                hasParallaxImages={false}
            />
        );
    }
}

const styles = StyleSheet.create({
    item: {
      width: screenWidth - 60,
      height: screenWidth - 60,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
  });

export default ReviseSwipe;
