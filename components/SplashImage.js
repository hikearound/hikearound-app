import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Animated, StatusBar } from 'react-native';
import { colors } from '../constants/Index';
import { withTheme } from '../utils/Themes';

function mapStateToProps() {
    return {};
}

function mapDispatchToProps() {
    return {};
}

const propTypes = {
    opacity: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    backgroundColor: PropTypes.string,
    animateOut: PropTypes.func,
};

const defaultProps = {
    opacity: 1,
    backgroundColor: colors.purple,
    animateOut: () => {},
};

class SplashImage extends React.PureComponent {
    render() {
        const { opacity, backgroundColor, animateOut } = this.props;

        return (
            <>
                <StatusBar barStyle='light-content' />
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor,
                        opacity,
                    }}
                >
                    <Animated.Image
                        source={require('../assets/splash.png')}
                        style={{
                            width: undefined,
                            height: undefined,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            resizeMode: 'contain',
                        }}
                        onLoadEnd={animateOut}
                    />
                </Animated.View>
            </>
        );
    }
}

SplashImage.propTypes = propTypes;
SplashImage.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(SplashImage));
