import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { opacities, spacing } from '../../../constants/Index';
import { closeModal } from '../../../actions/Modal';
import HeaderText from '../../../styles/Header';

const propTypes = {
    dispatchModalFlag: PropTypes.func.isRequired,
    continueText: PropTypes.string,
    modalCloseAction: PropTypes.string,
    isPageSheet: PropTypes.bool,
};

const defaultProps = {
    continueText: '',
    modalCloseAction: 'closeAndContinue',
    isPageSheet: false,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (modalCloseAction) =>
            dispatch(closeModal(modalCloseAction)),
    };
}

class ModalContinue extends React.PureComponent {
    close = () => {
        const { dispatchModalFlag, modalCloseAction } = this.props;
        dispatchModalFlag(modalCloseAction);
    };

    render() {
        const { continueText, isPageSheet } = this.props;

        return (
            <TouchableOpacity
                onPress={() => {
                    this.close();
                }}
                activeOpacity={opacities.regular}
                style={{
                    position: 'absolute',
                    right: parseInt(spacing.small, 10),
                    bottom: parseInt(spacing.small, 10),
                }}
            >
                <HeaderText isPageSheet={isPageSheet}>
                    {continueText}
                </HeaderText>
            </TouchableOpacity>
        );
    }
}

ModalContinue.propTypes = propTypes;
ModalContinue.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ModalContinue);
