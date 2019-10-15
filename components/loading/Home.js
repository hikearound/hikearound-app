import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'react-navigation';
import { View, Dimensions } from 'react-native';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Rect } from 'react-native-svg';
import { timings } from '../../constants/Index';
import { themes } from '../../constants/Themes';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    borderRadius: PropTypes.number,
    cardSpacing: PropTypes.number,
    cardHeight: PropTypes.number,
};

const defaultProps = {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    borderRadius: 6,
    cardSpacing: 10,
    cardHeight: 227,
};

class HomeLoadingState extends React.PureComponent {
    componentWillMount() {
        const theme = themes[this.context];
        this.setState({
            primaryColor: theme.loadingPrimary,
            secondaryColor: theme.loadingSecondary,
        });
    }

    static contextType = ThemeContext;

    render() {
        const {
            width,
            height,
            borderRadius,
            cardSpacing,
            cardHeight,
        } = this.props;

        const { primaryColor, secondaryColor } = this.state;

        return (
            <View
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <SvgAnimatedLinearGradient
                    height={height}
                    width={width}
                    duration={timings.medium}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                >
                    <Rect
                        x={cardSpacing}
                        y={cardSpacing}
                        rx={borderRadius}
                        ry={borderRadius}
                        width={width - 20}
                        height={cardHeight}
                    />
                    <Rect
                        x={cardSpacing}
                        y='247'
                        rx={borderRadius}
                        ry={borderRadius}
                        width={width - 20}
                        height={cardHeight}
                    />
                    <Rect
                        x={cardSpacing}
                        y='485'
                        rx={borderRadius}
                        ry={borderRadius}
                        width={width - 20}
                        height={cardHeight}
                    />
                </SvgAnimatedLinearGradient>
            </View>
        );
    }
}

HomeLoadingState.defaultProps = defaultProps;
HomeLoadingState.propTypes = propTypes;

export default HomeLoadingState;
