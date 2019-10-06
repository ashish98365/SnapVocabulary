import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ReviseCard extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ecf0f1', justifyContent: 'center', alignItems: 'center', }}>
                <Card
                    containerStyle={styles.cardStyle}
                >
                    <Text style={{ marginBottom: 10 }}>
                        This is card front.
                    </Text>
                    <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        backgroundColor='#03A9F4'
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='VIEW NOW' 
                    />
                </Card>
            </View>
        );
    }
}

const styles = {
    cardStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH - 40,
        height: 300,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
    }
};

export default ReviseCard;
