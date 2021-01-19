import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { withTheme } from '../../utils/Themes';
import TextContent from '../hike/TextContent';
import MapEmptyState from '../empty/MapEmptyState';
import SheetActions from '../SheetActions';
import { spacing, bottomSheet } from '../../constants/Index';
import { withNavigation } from '../../utils/Navigation';
import LoadingOverlay from '../LoadingOverlay';
import SheetHeader from './Header';
import { animationConfig } from '../../constants/Animation';
import { altitude } from '../../constants/Altitude';

const propTypes = {
    sheetRef: PropTypes.object.isRequired,
    mapRef: PropTypes.object.isRequired,
    sheetData: PropTypes.object,
    selectedHike: PropTypes.string,
};

const defaultProps = {
    selectedHike: null,
    sheetData: null,
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
                        />
                    </View>
                )}
            </Body>
        );
    };

    renderHeader = () => {
        const { mapRef } = this.props;
        return <SheetHeader mapRef={mapRef} shouldShowLocationButton />;
    };

    onClose = () => {
        const { mapRef } = this.props;

        const camera = {
            altitude: altitude.onClose,
            heading: animationConfig.heading,
            pitch: animationConfig.pitch,
        };

        mapRef.current.animateCamera(camera, {
            duration: animationConfig.duration,
        });
    };

    render() {
        const { sheetRef } = this.props;

        return (
            <BottomSheet
                snapPoints={[
                    bottomSheet.hike.collapsed,
                    bottomSheet.hike.expanded,
                    bottomSheet.hike.collapsed,
                ]}
                renderContent={this.renderContent}
                renderHeader={this.renderHeader}
                onCloseEnd={this.onClose}
                enabledInnerScrolling={false}
                ref={sheetRef}
            />
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
