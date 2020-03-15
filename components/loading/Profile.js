import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, LayoutAnimation } from 'react-native';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Circle, Rect } from 'react-native-svg';
import { timings } from '../../constants/Index';
import { withTheme } from '../../utils/Themes';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    circleDimension: PropTypes.number,
};

const defaultProps = {
    width: SCREEN_WIDTH,
    height: 300,
    circleDimension: 30,
};

class ProfileLoadingState extends React.PureComponent {
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
        const { width, height, circleDimension } = this.props;
        const { primaryColor, secondaryColor, showLoadingState } = this.state;

        return (
            <>
                {showLoadingState && (
                    <View
                        style={{
                            position: 'absolute',
                            left: 16,
                            top: 40,
                        }}
                    >
                        <SvgAnimatedLinearGradient
                            height={height}
                            width={width}
                            duration={timings.medium}
                            primaryColor={primaryColor}
                            secondaryColor={secondaryColor}
                        >
                            <Circle
                                cx={circleDimension}
                                cy={circleDimension}
                                r={circleDimension}
                            />
                            <Rect x='0' y='74' width='150' height='15' />
                            <Rect x='0' y='97' width='120' height='11' />
                        </SvgAnimatedLinearGradient>
                    </View>
                )}
            </>
        );
    }
}

ProfileLoadingState.defaultProps = defaultProps;
ProfileLoadingState.propTypes = propTypes;

export default withTheme(ProfileLoadingState);
