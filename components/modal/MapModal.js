import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import ModalDismiss from './header/Dismiss';
import HikeMap from '../map/Hike';
import GraphSheet from '../bottom_sheet/Graph';
import { toggleModalVisibility } from '../../utils/Modal';

const propTypes = {
    currentModal: PropTypes.string.isRequired,
    maxZoom: PropTypes.number,
    modifier: PropTypes.number,
    startingCoordinates: PropTypes.object,
    elevationArray: PropTypes.array,
    hike: PropTypes.object.isRequired,
    animationType: PropTypes.string,
    modalType: PropTypes.string,
    mapRef: PropTypes.func.isRequired,
    hid: PropTypes.string.isRequired,
    selectedHike: PropTypes.string,
    coordinates: PropTypes.array,
    region: PropTypes.object.isRequired,
    closeAction: PropTypes.string,
};

const defaultProps = {
    maxZoom: 16,
    modifier: 0.01,
    startingCoordinates: null,
    elevationArray: [],
    coordinates: [],
    animationType: 'push',
    modalType: 'map',
    selectedHike: null,
    closeAction: 'closeMap',
};

function mapStateToProps(state) {
    return {
        currentModal: state.modalReducer.currentModal,
    };
}

class MapModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.bottomSheetRef = React.createRef();

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

        this.state = {
            modalVisible: false,
        };
    }

    componentDidUpdate(prevProps) {
        const { currentModal, modalType } = this.props;

        toggleModalVisibility(
            prevProps,
            currentModal,
            modalType,
            this.showModal,
            this.hideModal,
        );
    }

    setRegion = (region) => {
        const { modifier } = this.props;

        return {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta + modifier,
            longitudeDelta: region.longitudeDelta + modifier,
        };
    };

    toggleStatusBar = (shouldShow) => {
        StatusBar.setHidden(shouldShow);
    };

    hideModal = () => {
        this.toggleStatusBar(false);
        this.setState({ modalVisible: false });
    };

    showModal = () => {
        this.toggleStatusBar(true);
        this.setState({ modalVisible: true });
    };

    render() {
        const { modalVisible } = this.state;
        const {
            animationType,
            mapRef,
            coordinates,
            region,
            maxZoom,
            startingCoordinates,
            hid,
            selectedHike,
            elevationArray,
            hike,
            closeAction,
        } = this.props;

        const initialRegion = this.setRegion(region);

        if (hid === selectedHike) {
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
                            startingCoordinates={startingCoordinates}
                            region={initialRegion}
                            maxZoom={maxZoom}
                            mapPadding={{ bottom: 70 }}
                        />
                        <ModalDismiss
                            includeBackground
                            closeAction={closeAction}
                        />
                    </ModalRoot>
                    <GraphSheet
                        sheetRef={this.bottomSheetRef}
                        elevationArray={elevationArray}
                        hike={hike}
                    />
                </Modal>
            );
        }

        return null;
    }
}

MapModal.propTypes = propTypes;
MapModal.defaultProps = defaultProps;

export default connect(mapStateToProps)(MapModal);

const ModalRoot = styled.View`
    display: flex;
    height: 100%;
`;
