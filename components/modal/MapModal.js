import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import ModalDismiss from '@components/modal/header/Dismiss';
import HikeMap from '@components/map/Hike';
import GraphSheet from '@components/bottom_sheet/Graph';
import { toggleModalVisibility } from '@utils/Modal';
import { withTheme } from '@utils/Themes';

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
    region: PropTypes.object,
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
    region: null,
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
            chartPosition: 0, // 0-1, representing position along the route
            isDragging: false,
        };

        this.dragTimeout = null;
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
        if (!region) return null;
        
        const { modifier } = this.props;

        return {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta + modifier,
            longitudeDelta: region.longitudeDelta + modifier,
        };
    };

    hideModal = () => {
        StatusBar.setBarStyle('light-content', true);
        this.setState({ modalVisible: false });
    };

    showModal = () => {
        const { theme } = this.props;

        if (!theme.dark) {
            StatusBar.setBarStyle('dark-content', true);
        }

        this.setState({ modalVisible: true });
    };

    handleChartPositionChange = (position) => {
        // Clear existing timeout
        if (this.dragTimeout) {
            clearTimeout(this.dragTimeout);
        }

        // Set dragging state and position
        this.setState({
            chartPosition: position,
            isDragging: true,
        });

        // Set timeout to hide marker after 300ms of no movement
        this.dragTimeout = setTimeout(() => {
            this.setState({ isDragging: false });
        }, 300);
    };

    render() {
        const { modalVisible, chartPosition, isDragging } = this.state;
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

        if (hid === selectedHike && modalVisible && region && elevationArray && initialRegion) {
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
                            showUserLocation
                            chartPosition={chartPosition}
                            isDragging={isDragging}
                        />
                        <ModalDismiss
                            includeBackground
                            closeAction={closeAction}
                            topOffset={20}
                        />
                    </ModalRoot>
                    <GraphSheet
                        sheetRef={this.bottomSheetRef}
                        elevationArray={elevationArray}
                        hike={hike}
                        mapRef={this.mapRef}
                        onPositionChange={this.handleChartPositionChange}
                    />
                </Modal>
            );
        }

        return null;
    }
}

MapModal.propTypes = propTypes;
MapModal.defaultProps = defaultProps;

export default connect(mapStateToProps, {})(withTheme(MapModal));

const ModalRoot = styled.View`
    display: flex;
    height: 100%;
`;
