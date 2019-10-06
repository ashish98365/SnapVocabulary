import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Animated } from 'react-native';
import { Icon } from 'react-native-elements';

class Panel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title       : props.title,
            expanded    : false,
            animation   : new Animated.Value(39)
        };
    }

    setMaxHeight(event) {
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }
    
    setMinHeight(event) {
        this.setState({
            minHeight: event.nativeEvent.layout.height
        });
    }

    toggle() {
        const initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
        const finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded: !this.state.expanded  //Step 2
        });

        this.state.animation.setValue(initialValue);  //Step 3
        Animated.spring(     //Step 4
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();  //Step 5
    }

    render() {
        let icon = <Icon iconStyle={styles.title} name='arrow-circle-o-down' type='font-awesome' color='#517fa4' />;

        if (this.state.expanded) {
            icon = <Icon iconStyle={styles.title} name='arrow-circle-o-up' type='font-awesome' color='#517fa4' />;
        }

        return (
            
            <Animated.View style={[styles.container, { height: this.state.animation }]} >
                <View onLayout={this.setMinHeight.bind(this)}>
                    <TouchableHighlight 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1"
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.title}>{this.state.title}</Text>
                            { icon }
                        </View>
                    </TouchableHighlight>
                </View>
                
                <View style={styles.body} onLayout={this.setMaxHeight.bind(this)}>
                    <Text>
                        { this.props.note ? this.props.note : 'No Note saved for this word' }
                    </Text>
                </View>

            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 10,
        overflow: 'hidden'
    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        padding: 6,
        color: '#2a2f43',
        fontWeight: 'bold'
    },
    button: {

    },
    buttonImage: {
        width: 30,
        height: 25
    },
    body: {
        padding: 10,
        paddingTop: 0
    }
});

export default Panel;
