import React from 'react';
import PropTypes from 'prop-types';
import { View, LayoutAnimation } from 'react-native';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Rect } from 'react-native-svg';
import { timings, borderRadius, spacing } from '../../constants/Index';
import { withTheme } from '../../utils/Themes';
import { getScreenHeight, getScreenWidth } from '../../utils/Screen';

const cards = [
    { yOffset: 45 },
    { yOffset: 275 },
    { yOffset: 505 },
    { yOffset: 735 },
];

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    cardBorderRadius: PropTypes.number,
    cardSpacing: PropTypes.number,
    cardHeight: PropTypes.number,
    border: PropTypes.object,
    header: PropTypes.object,
};

const defaultProps = {
    cardHeight: 220,
    width: getScreenWidth(),
    height: getScreenHeight(),
    cardSpacing: parseInt(spacing.tiny, 10),
    cardBorderRadius: parseInt(borderRadius.medium, 10),
    border: { yOffset: 34, height: 1 },
    header: { height: parseInt(spacing.small, 10), width: 175 },
};

class HomeLoadingState extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showLoadingState: false,
        };
    }

    componentDidMount() {
        const { theme } = this.props;

        this.setState({
            primaryColor: theme.colors.loadingPrimary,
            secondaryColor: theme.colors.loadingSecondary,
            showLoadingState: true,
        });
    }

    componentWillUnmount() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    render() {
        const {
            width,
            height,
            cardBorderRadius,
            cardSpacing,
            cardHeight,
            border,
            header,
        } = this.props;
        const { primaryColor, secondaryColor, showLoadingState } = this.state;

        return (
            <>
                {showLoadingState && (
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
                                width={header.width}
                                height={header.height}
                            />
                            <Rect
                                y={border.yOffset}
                                width={width}
                                height={border.height}
                            />
                            {cards.map(({ yOffset }, index) => (
                                <Rect
                                    key={index}
                                    x={cardSpacing}
                                    y={yOffset}
                                    rx={cardBorderRadius}
                                    ry={cardBorderRadius}
                                    width={width - 20}
                                    height={cardHeight}
                                />
                            ))}
                        </SvgAnimatedLinearGradient>
                    </View>
                )}
            </>
        );
    }
}

HomeLoadingState.defaultProps = defaultProps;
HomeLoadingState.propTypes = propTypes;

export default withTheme(HomeLoadingState);
