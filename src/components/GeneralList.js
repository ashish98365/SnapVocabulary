import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { ListItem } from 'react-native-elements';

import ProgressCircle from './PercentCircle';

class GeneralList extends Component {

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
                    leftIcon={<ProgressCircle percent={this.props.percent} />}
                    chevronColor="black"
                    chevron
                />
            </TouchableWithoutFeedback>
        );
    }
}

export default GeneralList;
