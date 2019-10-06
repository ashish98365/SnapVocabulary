import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

class FlipWordBack extends Component {
    render() {
        return (
            <View>
                <Card
                title='HELLO WORLD'
                image={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPm_xU01Kfvl9aekI-GAdC41QQ66VMoQcFeJndnFIkognzKbrJzw' }}>
                    <Text style={{ marginBottom: 10 }}>
                        This is card back.
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

export default FlipWordBack;
