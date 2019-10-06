import React, { Component } from 'react';
import { Text } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

class PercentCircle extends Component {
    render() {
        return (
            <ProgressCircle
                percent={this.props.percent}
                radius={25}
                borderWidth={4}
                color="#3399FF"
                shadowColor="#999"
                bgColor="#fff"
            >
            <Text style={{ fontSize: 16 }}>{`${this.props.percent}%`}</Text>
        </ProgressCircle>
        );
    }
}

export default PercentCircle;
