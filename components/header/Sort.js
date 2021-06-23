import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { spacing, opacities } from '@constants/Index';
import FilterIcon from '@icons/Filter';
import { showModal } from '@actions/Modal';

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
    };
}

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    size: PropTypes.number,
    modalType: PropTypes.string,
};

const defaultProps = {
    modalType: 'filter',
    size: 40,
};

class Sort extends React.PureComponent {
    showFilter = () => {
        const { dispatchModalFlag, modalType } = this.props;
        dispatchModalFlag(modalType);
    };

    render() {
        const { size } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.showFilter}
            >
                <View style={{ aspectRatio: 1, height: size }}>
                    <FilterIcon />
                </View>
            </TouchableOpacity>
        );
    }
}

Sort.propTypes = propTypes;
Sort.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sort);

const View = styled.View`
    margin-top: -${spacing.micro}px;
`;
