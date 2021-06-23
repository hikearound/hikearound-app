import React from 'react';
import PropTypes from 'prop-types';
import { LayoutAnimation } from 'react-native';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Rect } from 'react-native-svg';
import { timings, borderRadius } from '@constants/Index';
import { withTheme } from '@utils/Themes';
import { getScreenWidth } from '@utils/Screen';

const propTypes = {
    width: PropTypes.number,
    cardBorderRadius: PropTypes.number,
    dimension: PropTypes.number,
    count: PropTypes.number,
    offset: PropTypes.number,
    duration: PropTypes.number,
    shouldEaseAnimation: PropTypes.bool,
};

const defaultProps = {
    cardBorderRadius: parseInt(borderRadius.medium, 10),
    duration: timings.medium,
    width: getScreenWidth(),
    shouldEaseAnimation: false,
    dimension: 75,
    offset: 85,
    count: 0,
};

class ThumbnailLoadingState extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            thumbnails: [],
        };
    }

    componentDidMount() {
        this.setThumbnailOffsets();
    }

    componentDidUpdate(prevProps) {
        const { count } = this.props;

        if (prevProps.count !== count) {
            this.setThumbnailOffsets();
        }
    }

    componentWillUnmount() {
        const { shouldEaseAnimation } = this.props;

        if (shouldEaseAnimation) {
            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
            );
        }
    }

    setThumbnailOffsets = () => {
        const { count, offset } = this.props;
        const thumbnails = [];

        for (let i = 0; i < count; i += 1) {
            if (i === 0) {
                thumbnails.push({ xOffset: i });
            } else if (i <= 4) {
                thumbnails.push({ xOffset: offset * i });
            }
        }

        this.setState({ thumbnails });
    };

    render() {
        const { width, cardBorderRadius, dimension, duration, theme } =
            this.props;
        const { thumbnails } = this.state;

        if (thumbnails.length >= 1) {
            return (
                <SvgAnimatedLinearGradient
                    duration={duration}
                    primaryColor={theme.colors.loadingPrimary}
                    secondaryColor={theme.colors.loadingSecondary}
                    width={width}
                    height={dimension}
                >
                    {thumbnails.map(({ xOffset }, index) => (
                        <Rect
                            key={index}
                            x={xOffset}
                            y={0}
                            rx={cardBorderRadius}
                            ry={cardBorderRadius}
                            width={dimension}
                            height={dimension}
                        />
                    ))}
                </SvgAnimatedLinearGradient>
            );
        }
        return null;
    }
}

ThumbnailLoadingState.defaultProps = defaultProps;
ThumbnailLoadingState.propTypes = propTypes;

export default withTheme(ThumbnailLoadingState);
