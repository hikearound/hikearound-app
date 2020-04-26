import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { LayoutAnimation } from 'react-native';
import { colors, spacing, opacities } from '../../constants/Index';

const iconRightMargin = '30px';
const iconTopMargin = '-1px';

const mapIconVisible = { mapIconDisplay: 'flex', listIconDisplay: 'none' };
const listIconVisible = { mapIconDisplay: 'none', listIconDisplay: 'flex' };

const propTypes = {
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
    screenType: PropTypes.string.isRequired,
};

const defaultProps = {
    color: colors.white,
};

function mapStateToProps(state) {
    return {
        screenType: state.homeReducer.screenType,
    };
}

function mapDispatchToProps() {
    return {};
}

class Toggle extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            mapIconDisplay: 'flex',
            listIconDisplay: 'none',
        };
    }

    componentDidUpdate(prevProps) {
        const { screenType } = this.props;

        if (prevProps.screenType !== screenType) {
            this.toggleIconVisibility(screenType);
        }

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    toggleIconVisibility = (screenType) => {
        if (screenType === 'feed') {
            this.setState(mapIconVisible);
        } else {
            this.setState(listIconVisible);
        }
    };

    render() {
        const { onPress, color } = this.props;
        const { mapIconDisplay, listIconDisplay } = this.state;

        return (
            <StyledOpacity activeOpacity={opacities.regular} onPress={onPress}>
                <Entypo
                    name='list'
                    size={26}
                    color={color}
                    style={{ display: listIconDisplay }}
                />
                <MaterialIcons
                    name='map'
                    size={26}
                    color={color}
                    style={{ display: mapIconDisplay }}
                />
            </StyledOpacity>
        );
    }
}

Toggle.propTypes = propTypes;
Toggle.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);

const StyledOpacity = styled.TouchableOpacity`
    position: absolute;
    margin-left: ${spacing.tiny}px;
    right: ${iconRightMargin};
    top: ${iconTopMargin};
`;
