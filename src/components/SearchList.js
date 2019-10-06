import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { ListItem } from 'react-native-elements';

import ProgressCircle from './PercentCircle';

class SearchList extends Component {

    performAction = () => {
        this.props.action(this.props.param, this.props.navigate, this.props.navigationParam);
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.performAction}>
                <ListItem
                    style={{ borderBottomWidth: 1, borderColor: '#ddd' }}
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                    leftIcon={{ name:  }}
                    chevronColor="black"
                    chevron
                />
            </TouchableWithoutFeedback>
        );
    }
}

export default SearchList;
