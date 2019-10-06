import React, { Component } from 'react';
import { Text } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

class HeaderExample extends Component {
  render() {
    return (
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text>Header</Text>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
    );
  }
}

export default HeaderExample;
