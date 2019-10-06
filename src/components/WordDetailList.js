import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Accordion } from 'native-base';

class WordDetailList extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Container>
                    <Content padder>
                    <Accordion
                        dataArray={this.props.data}
                        headerStyle={{ backgroundColor: '#b7daf8' }}
                        contentStyle={{ backgroundColor: '#ddecf8' }}
                    />
                    </Content>
                </Container>
            </View>
        );
    }
}

export default WordDetailList;
