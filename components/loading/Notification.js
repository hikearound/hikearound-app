import React from 'react';
import PropTypes from 'prop-types';
import { View, LayoutAnimation } from 'react-native';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Circle, Rect } from 'react-native-svg';
import { timings } from '../../constants/Index';
import { withTheme } from '../../utils/Themes';
import { getScreenWidth } from '../../utils/Screen';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    circleDimension: PropTypes.number,
    xOffset: PropTypes.number,
    lineHeight: PropTypes.number,
};

const defaultProps = {
    width: getScreenWidth(),
    height: 300,
    circleDimension: 20,
    xOffset: 50,
    lineHeight: 13,
};

class NotificationLoadingState extends React.PureComponent {
    componentWillUnmount() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    render() {
        const {
            width,
            height,
            circleDimension,
            theme,
            xOffset,
            lineHeight,
        } = this.props;

        return (
            <View style={{ position: 'absolute', left: 16, top: 16 }}>
                <SvgAnimatedLinearGradient
                    height={height}
                    width={width}
                    duration={timings.medium}
                    primaryColor={theme.colors.loadingPrimary}
                    secondaryColor={theme.colors.loadingSecondary}
                >
                    <Circle
                        cx={circleDimension}
                        cy={circleDimension}
                        r={circleDimension}
                    />
                    <Rect x={xOffset} y='2' width='150' height={lineHeight} />
                    <Rect x={xOffset} y='22' width='275' height={lineHeight} />
                    <Rect x={xOffset} y='41' width='50' height={lineHeight} />
                    <Rect x={xOffset} y='60' width='80' height='12' />
                </SvgAnimatedLinearGradient>
            </View>
        );
    }
}

NotificationLoadingState.defaultProps = defaultProps;
NotificationLoadingState.propTypes = propTypes;

export default withTheme(NotificationLoadingState);
