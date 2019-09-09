import React from 'react';
import styled from 'styled-components';
import {
    Modal,
    StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../constants/Index';

function mapStateToProps(state) {
    return {
        action: state.action,
    };
}

class MapModal extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalVisible: false,
        };
    }

    componentDidUpdate() {
        this.toggleMapModal();
    }

    toggleMapModal = () => {
        const { action } = this.props;

        if (action === 'showMapModal') {
            this.showMapModal();
        }
    }

    showMapModal = () => {
        this.setState({ modalVisible: true });
        StatusBar.setHidden(true);
    }

    render() {
        const { modalVisible } = this.state;

        return (
            <Modal
                animationType='fade'
                transparent={false}
                visible={modalVisible}
            >
                <ModalRoot />
            </Modal>
        );
    }
}

export default connect(
    mapStateToProps,
)(MapModal);

const ModalRoot = styled.View`
    display: flex;
    height: 100%;
    background-color: ${colors.trueBlack};
`;
