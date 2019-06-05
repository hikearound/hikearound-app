import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Animated, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { spacing, colors, fontSizes, fontWeights } from '../constants/Index'

function mapStateToProps(state) {
    return {
        action: state.action
    }
}

const screenHeight = Dimensions.get('window').height;

class Toast extends React.Component {
    state = {
        top: new Animated.Value(screenHeight)
    };

    componentDidUpdate() {
        this.showToast();
    }

    showToast = () => {
        if (this.props.action == 'favoriteHike') {
            Animated.timing(this.state.top, {
                toValue: screenHeight - 250,
                duration: 500,
            }).start();
        }
        this.timeout = setTimeout(() => {
            this.hideToast();
        }, 3500);
        this.timeout;
    };

    hideToast = () => {
        clearTimeout(this.timeout);
        Animated.timing(this.state.top, {
            toValue: screenHeight,
            duration: 500,
        }).start();
    };

    render() {
        return (
            <AnimatedContainer style={{ top: this.state.top }}>
                <ToastText>You favorited, {this.props.name}.</ToastText>
                <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={this.buttonPress}
                    style={{
                        position: 'absolute',
                        right: 12,
                        top: 5,
                    }}>
                    <Icon
                        name='ios-close'
                        color='#FFF'
                        size={30}
                    />
                </TouchableOpacity>
            </AnimatedContainer>
        );
    }
}

export default connect(
    mapStateToProps
)(Toast);

const Container = styled.View`
    position: absolute;
    left: 15px;
    right: 15px;
    background: rgba(147,93,255,0.95);
    box-shadow: 0 4px 12px ${colors.transparentGray};
    border-radius: 6px;
    z-index: 1;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const ToastText = styled.Text`
    font-size: 15px;
    color: #FFF;
    font-weight: 500;
    padding: 12px;
`;
