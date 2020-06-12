import React from 'react';
import PropTypes from 'prop-types';
import { LayoutAnimation } from 'react-native';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Rect } from 'react-native-svg';
import { timings, borderRadius } from '../../constants/Index';
import { withTheme } from '../../utils/Themes';
import { getScreenWidth } from '../../utils/Screen';

const propTypes = {
    width: PropTypes.number,
    cardBorderRadius: PropTypes.number,
};

const defaultProps = {
    width: getScreenWidth(),
    cardBorderRadius: parseInt(borderRadius.medium, 10),
};

class MapLoadingState extends React.PureComponent {
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

    componentWillUnmount() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    render() {
        const { width, cardBorderRadius } = this.props;
        const { primaryColor, secondaryColor } = this.state;

        return (
            <SvgAnimatedLinearGradient
                duration={timings.medium}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                width={width}
            >
                <Rect
                    x={0}
                    y={0}
                    rx={cardBorderRadius}
                    ry={cardBorderRadius}
                    width={width - 30}
                    height={200}
                />
            </SvgAnimatedLinearGradient>
        );
    }
}

MapLoadingState.defaultProps = defaultProps;
MapLoadingState.propTypes = propTypes;

export default withTheme(MapLoadingState);
