import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import ModalDismiss from './header/Dismiss';
import HikeMap from '../map/Hike';
import GraphSheet from '../bottom_sheet/Graph';
import { toggleModalVisibility } from '../../utils/Modal';

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
        currentModal: state.modalReducer.currentModal,
    };
}

const propTypes = {
    action: PropTypes.string.isRequired,
    maxZoom: PropTypes.number,
    modifier: PropTypes.number,
    startingCoordinates: PropTypes.object,
    elevationArray: PropTypes.array,
    hike: PropTypes.object.isRequired,
    animationType: PropTypes.string,
    modalAction: PropTypes.string,
    mapRef: PropTypes.func.isRequired,
    hid: PropTypes.string.isRequired,
    selectedHike: PropTypes.string,
    coordinates: PropTypes.array,
    region: PropTypes.object.isRequired,
};

const defaultProps = {
    maxZoom: 16,
    modifier: 0.01,
    startingCoordinates: null,
    elevationArray: [],
    coordinates: [],
    animationType: 'push',
    modalAction: 'showMap',
    selectedHike: null,
};

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
        const { action, modalAction } = this.props;
        const prevAction = prevProps.action;

        toggleModalVisibility(
            action,
            modalAction,
            prevAction,
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

    hideModal = () => {
        this.setState({ modalVisible: false });
        StatusBar.setHidden(false);
    };

    showModal = () => {
        this.setState({ modalVisible: true });
        StatusBar.setHidden(true);
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
                            modalCloseAction='closeMap'
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
