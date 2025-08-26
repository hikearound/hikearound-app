import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { withTheme } from '@utils/Themes';
import TextContent from '@components/hike/TextContent';
import MapEmptyState from '@components/empty/MapEmptyState';
import SheetActions from '@components/SheetActions';
import { spacing, bottomSheet } from '@constants/Index';
import { withNavigation } from '@utils/Navigation';
import LoadingOverlay from '@components/LoadingOverlay';
import SheetHeader from '@components/bottom_sheet/Header';
import { animationConfig } from '@constants/Animation';
import { altitude } from '@constants/Altitude';

const propTypes = {
    sheetRef: PropTypes.object.isRequired,
    mapRef: PropTypes.object.isRequired,
    sheetData: PropTypes.object,
    selectedHike: PropTypes.string,
    onClose: PropTypes.func,
    theme: PropTypes.object.isRequired,
};

const defaultProps = {
    selectedHike: null,
    sheetData: null,
    onClose: null,
};

class HikeSheet extends React.Component {
    renderContent = () => {
        const { selectedHike, sheetData } = this.props;

        return (
            <Body>
                {!selectedHike && <MapEmptyState />}
                {!sheetData && selectedHike && (
                    <LoadingOverlay loading transparentBackground />
                )}
                {sheetData && selectedHike && (
                    <View>
                        <TextContent
                            name={sheetData.name}
                            city={sheetData.city}
                            state={sheetData.state}
                            hid={selectedHike}
                            distance={sheetData.distance}
                            description={sheetData.description}
                            numberOfLines={4}
                            placement='sheet'
                            isExpandable={false}
                            truncateName
                        />
                        <SheetActions
                            selectedHike={selectedHike}
                            coordinates={sheetData.coordinates.starting}
                            hikeName={sheetData.name}
                        />
                    </View>
                )}
            </Body>
        );
    };

    renderHeader = () => {
        const { mapRef, sheetRef } = this.props;
        return (
            <SheetHeader
                mapRef={mapRef}
                sheetRef={sheetRef}
                shouldShowLocationButton
            />
        );
    };

    onClose = () => {
        const { mapRef, selectedHike, onClose } = this.props;

        const camera = {
            altitude: altitude.onClose,
            heading: animationConfig.heading,
            pitch: animationConfig.pitch,
        };

        if (selectedHike) {
            mapRef.current.animateCamera(camera, {
                duration: animationConfig.duration,
            });
        }

        // Call the provided onClose callback to clear routes
        if (onClose) {
            onClose();
        }
    };

    render() {
        const { sheetRef, theme } = this.props;

        return (
            <BottomSheet
                ref={sheetRef}
                index={0}
                snapPoints={[
                    bottomSheet.hike.collapsed,
                    bottomSheet.hike.expanded,
                ]}
                onChange={(index) => {
                    if (index === -1 || index === 0) {
                        this.onClose();
                    }
                }}
                enablePanDownToClose
                handleIndicatorStyle={{
                    width: 35,
                    height: 5,
                    borderRadius: 5,
                    backgroundColor: theme?.colors?.sheetHandle || '#999',
                    marginTop: 6,
                }}
            >
                {this.renderHeader()}
                <BottomSheetView style={{ marginTop: -8 }}>{this.renderContent()}</BottomSheetView>
            </BottomSheet>
        );
    }
}

HikeSheet.propTypes = propTypes;
HikeSheet.defaultProps = defaultProps;

export default withNavigation(withTheme(HikeSheet));

const Body = styled.View`
    height: 320px;
    padding: ${spacing.small}px;
    background-color: ${(props) => props.theme.sheetBackground};
`;
