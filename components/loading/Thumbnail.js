import React from 'react';
import PropTypes from 'prop-types';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Rect } from 'react-native-svg';
import { timings, borderRadius } from '../../constants/Index';
import { withTheme } from '../../utils/Themes';
import { getScreenWidth } from '../../utils/Screen';

const thumbnails = [{ xOffset: 0 }, { xOffset: 85 }];

const propTypes = {
    width: PropTypes.number,
    cardBorderRadius: PropTypes.number,
    dimension: PropTypes.number,
};

const defaultProps = {
    width: getScreenWidth(),
    cardBorderRadius: parseInt(borderRadius.medium, 10),
    dimension: 75,
};

class ThumbnailLoadingState extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { theme } = this.props;

        this.setState({
            primaryColor: theme.colors.loadingPrimary,
            secondaryColor: theme.colors.loadingSecondary,
        });
    }

    render() {
        const { width, cardBorderRadius, dimension } = this.props;
        const { primaryColor, secondaryColor } = this.state;

        return (
            <SvgAnimatedLinearGradient
                duration={timings.medium}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
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
}

ThumbnailLoadingState.defaultProps = defaultProps;
ThumbnailLoadingState.propTypes = propTypes;

export default withTheme(ThumbnailLoadingState);
