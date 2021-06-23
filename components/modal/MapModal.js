import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import ModalDismiss from '@components/modal/header/Dismiss';
import HikeMap from '@components/map/Hike';
import GraphSheet from '@components/bottom_sheet/Graph';
import { toggleModalVisibility } from '@utils/Modal';
import { toggleStatusBar } from '@utils/Themes';

const propTypes = {
    currentModal: PropTypes.string.isRequired,
    maxZoom: PropTypes.number,
    modifier: PropTypes.number,
    startingCoordinates: PropTypes.object,
    elevationArray: PropTypes.array,
    hike: PropTypes.object.isRequired,
    animationType: PropTypes.string,
    modalType: PropTypes.string,
    hid: PropTypes.string.isRequired,
    selectedHike: PropTypes.string,
    coordinates: PropTypes.array,
    region: PropTypes.object.isRequired,
    closeAction: PropTypes.string,
    mapType: PropTypes.string,
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
    mapType: 'standard',
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
        this.mapRef = React.createRef();

        this.state = {
            modalVisible: false,
        };
    }

    componentDidUpdate(prevProps) {
        const { currentModal, modalType } = this.props;

        const functions = {
            show: this.showModal.bind(this),
            hide: this.hideModal.bind(this),
        };

        toggleModalVisibility(prevProps, currentModal, modalType, functions);
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

    hideModal = () => {
        toggleStatusBar(false);
        this.setState({ modalVisible: false });
    };

    showModal = () => {
        toggleStatusBar(true);
        this.setState({ modalVisible: true });
    };

    render() {
        const { modalVisible } = this.state;
        const {
            animationType,
            coordinates,
            region,
            maxZoom,
            startingCoordinates,
            hid,
            selectedHike,
            elevationArray,
            hike,
            closeAction,
            mapType,
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
                            mapRef={this.mapRef}
                            coordinates={coordinates}
                            startingCoordinates={startingCoordinates}
                            region={initialRegion}
                            maxZoom={maxZoom}
                            mapPadding={{ bottom: 70 }}
                            mapBorderRadius={0}
                            mapType={mapType}
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
                        mapRef={this.mapRef}
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
