import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import ModalDismiss from '../ModalDismiss';
import ModalBase from './ModalBase';
import HikeMap from '../HikeMap';
import { spacing } from '../../constants/Index';

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
    };
}

const propTypes = {
    maxZoom: PropTypes.number,
};

const defaultProps = {
    maxZoom: 16,
};

class MapModal extends ModalBase {
    render() {
        const { modalVisible } = this.state;
        const {
            animationType,
            mapRef,
            coordinates,
            region,
            maxZoom,
        } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={false}
                visible={modalVisible}
            >
                <ModalRoot>
                    <HikeMap
                        fullHeight
                        mapRef={mapRef}
                        coordinates={coordinates}
                        region={region}
                        maxZoom={maxZoom}
                        mapPadding={{
                            left: parseInt(spacing.tiny, 10),
                        }}
                    />
                    <ModalDismiss includeBackground />
                </ModalRoot>
            </Modal>
        );
    }
}

MapModal.propTypes = propTypes;
MapModal.defaultProps = defaultProps;

export default connect(mapStateToProps)(MapModal);

const ModalRoot = styled.View`
    display: flex;
    height: 100%;
`;
