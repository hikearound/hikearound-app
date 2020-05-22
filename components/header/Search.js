import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { showModal } from '../../actions/Modal';
import { colors, opacities } from '../../constants/Index';

const propTypes = {
    color: PropTypes.string,
    dispatchModalFlag: PropTypes.func.isRequired,
    modalType: PropTypes.string,
};

const defaultProps = {
    color: colors.white,
    modalType: 'search',
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
    };
}

class Search extends React.PureComponent {
    onPress = () => {
        const { dispatchModalFlag, modalType } = this.props;
        dispatchModalFlag(modalType);
    };

    render() {
        const { color } = this.props;

        return (
            <StyledOpacity
                activeOpacity={opacities.regular}
                onPress={this.onPress}
            >
                <Ionicons name='md-search' size={26} color={color} />
            </StyledOpacity>
        );
    }
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const StyledOpacity = styled.TouchableOpacity`
    margin-top: 1px;
`;
