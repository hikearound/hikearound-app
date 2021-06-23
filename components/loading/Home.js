import React from 'react';
import PropTypes from 'prop-types';
import { View, LayoutAnimation } from 'react-native';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Rect } from 'react-native-svg';
import { timings, borderRadius, spacing } from '@constants/Index';
import { withTheme } from '@utils/Themes';
import { getScreenHeight, getScreenWidth } from '@utils/Screen';

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
    cardHeight: 200,
    width: getScreenWidth(),
    height: getScreenHeight(),
    cardSpacing: parseInt(spacing.tiny, 10),
    cardBorderRadius: parseInt(borderRadius.medium, 10),
    border: { yOffset: 34, height: 1 },
    header: { height: parseInt(spacing.small, 10), width: 175 },
};

const cards = [
    { yOffset: 45 },
    { yOffset: 255 },
    { yOffset: 465 },
    { yOffset: 675 },
];

class HomeLoadingState extends React.PureComponent {
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
            theme,
        } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <SvgAnimatedLinearGradient
                    height={height}
                    width={width}
                    duration={timings.medium}
                    primaryColor={theme.colors.loadingPrimary}
                    secondaryColor={theme.colors.loadingSecondary}
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
        );
    }
}

HomeLoadingState.defaultProps = defaultProps;
HomeLoadingState.propTypes = propTypes;

export default withTheme(HomeLoadingState);
