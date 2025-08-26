import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { LineChart } from 'react-native-gifted-charts';
import { Dimensions, View, Text } from 'react-native';
import { withTranslation } from 'react-i18next';
import { withTheme } from '@utils/Themes';
import {
    SheetPadding,
    Header,
    HeaderItem,
    HeaderLabel,
    HeaderSubtext,
} from '@styles/Sheets';
import { bottomSheet } from '@constants/Index';
import { withNavigation } from '@utils/Navigation';
import LocationButton from '@components/map/button/Location';
import { animationConfig } from '@constants/Animation';

const propTypes = {
    sheetRef: PropTypes.object.isRequired,
    elevationArray: PropTypes.array.isRequired,
    hike: PropTypes.object.isRequired,
    height: PropTypes.number,
    mapRef: PropTypes.object,
    onPositionChange: PropTypes.func,
};

const defaultProps = {
    height: 200,
    mapRef: {},
    onPositionChange: () => {},
};

const { width } = Dimensions.get('window');

const CustomBackground = ({ style, mapRef, sheetRef, theme }) => (
    <>
        <View
            style={[
                style,
                {
                    backgroundColor: theme?.colors?.sheetBackground,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                },
            ]}
        />
        <View style={{ position: 'absolute', top: -13, right: 5 }}>
            <LocationButton
                mapRef={mapRef}
                sheetRef={sheetRef}
                animationConfig={animationConfig}
                bottomOffset={0}
            />
        </View>
    </>
);

CustomBackground.propTypes = {
    style: PropTypes.object,
    mapRef: PropTypes.object.isRequired,
    sheetRef: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

CustomBackground.defaultProps = {
    style: null,
};

function GraphSheet({
    sheetRef,
    mapRef,
    elevationArray,
    hike,
    height,
    t,
    onPositionChange,
    theme,
}) {
    const { distance, elevation } = hike;
    const lastPositionRef = React.useRef(-1);
    const heartbeatIntervalRef = React.useRef(null);
    const [isChartActive, setIsChartActive] = React.useState(false);

    // Cleanup heartbeat interval on unmount
    React.useEffect(
        () => () => {
            if (heartbeatIntervalRef.current) {
                clearInterval(heartbeatIntervalRef.current);
            }
        },
        [],
    );

    // Reduce data points for better performance and visibility
    const step = Math.max(1, Math.floor(elevationArray.length / 50)); // Show max 50 points
    const reducedElevations = elevationArray.filter(
        (_, index) => index % step === 0,
    );

    // Create strategic label points to avoid duplicates
    const labelPositions = new Set();
    const chartData = reducedElevations.map((elevationValue, index) => {
        const originalIndex = index * step;
        const distanceAtPoint =
            (originalIndex / elevationArray.length) * distance;

        let labelText = '';
        const roundedDistance = Math.round(distanceAtPoint);

        if (index === 0) {
            labelText = '';
            labelPositions.add(0);
        } else if (
            roundedDistance > 0 &&
            !labelPositions.has(roundedDistance) &&
            Math.abs(distanceAtPoint - roundedDistance) < 0.2
        ) {
            labelText = `${roundedDistance} mi`;
            labelPositions.add(roundedDistance);
        }

        return {
            value: Number(elevationValue),
            label: labelText,
            labelTextStyle: labelText
                ? {
                      width: 40,
                      textAlign: 'center',
                      color: '#666',
                      fontSize: 10,
                  }
                : undefined,
        };
    });

    // Use real data now that we know chart works
    const dataToUse = chartData;

    const renderContentHeaderItem = (label, subtext) => (
        <React.Fragment key={label}>
            <HeaderItem>
                <HeaderLabel>{label}</HeaderLabel>
                <HeaderSubtext>{subtext}</HeaderSubtext>
            </HeaderItem>
        </React.Fragment>
    );

    const renderContentHeader = () => [
        renderContentHeaderItem(
            t('sheet.elevation.label.distance'),
            t('sheet.elevation.distance', {
                unit: t('sheet.elevation.unit.miles'),
                distance,
            }),
        ),
        renderContentHeaderItem(
            t('sheet.elevation.label.elevation'),
            t('sheet.elevation.distance', {
                unit: t('sheet.elevation.unit.feet'),
                distance: elevation.toLocaleString(),
            }),
        ),
    ];

    const renderContent = () => (
        <Body>
            <Header>{renderContentHeader()}</Header>
            <ChartContainer
                onTouchStart={() => {
                    // Disable sheet panning and start heartbeat
                    setIsChartActive(true);
                    heartbeatIntervalRef.current = setInterval(() => {
                        if (lastPositionRef.current >= 0) {
                            onPositionChange(lastPositionRef.current);
                        }
                    }, 500); // Send position every 500ms while touching
                }}
                onTouchEnd={() => {
                    // Re-enable sheet panning and stop heartbeat
                    setIsChartActive(false);
                    if (heartbeatIntervalRef.current) {
                        clearInterval(heartbeatIntervalRef.current);
                        heartbeatIntervalRef.current = null;
                    }
                }}
            >
                <LineChart
                    data={dataToUse}
                    width={width - 20}
                    height={height - 60}
                    curved={false}
                    thickness={2.5}
                    color='#935DFF'
                    dataPointsColor='#935DFF'
                    dataPointsRadius={4}
                    hideDataPoints
                    showValuesAsDataPointsText={false}
                    showPointer
                    pointerConfig={{
                        pointer1Color: '#935DFF',
                        pointerStripUptoDataPoint: true,
                        pointerStripColor: '#E0E0E0',
                        strokeWidth: 1,
                        radius: 4,
                        activatePointersOnLongPress: false,
                        activatePointersDelay: 0,
                        pointerLabelComponent: (items) => {
                            console.log(
                                'pointerLabelComponent called with items:',
                                items,
                            );
                            // Calculate continuous position along the full polyline
                            if (items && items.length > 0 && onPositionChange) {
                                const currentValue = items[0].value;
                                const dataPointIndex = dataToUse.findIndex(
                                    (point) => point.value === currentValue,
                                );

                                if (dataPointIndex >= 0) {
                                    // Convert reduced array index back to original full array position
                                    const originalArrayIndex =
                                        dataPointIndex * step;

                                    // Calculate smooth position as a percentage of the full route
                                    const position =
                                        originalArrayIndex /
                                        (elevationArray.length - 1);

                                    // Simple throttling - only update if position changed significantly
                                    if (
                                        Math.abs(
                                            position - lastPositionRef.current,
                                        ) > 0.008
                                    ) {
                                        lastPositionRef.current = position;
                                        onPositionChange(
                                            Math.max(0, Math.min(1, position)),
                                        );
                                    }
                                }
                            }

                            return (
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        paddingHorizontal: 8,
                                        paddingVertical: 6,
                                        borderRadius: 8,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: 60,
                                        borderWidth: 1,
                                        borderColor: '#E0E0E0',
                                        marginTop: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#333',
                                            fontSize: 14,
                                            fontWeight: '500',
                                        }}
                                    >
                                        {`${Math.round(
                                            items[0]?.value || 0,
                                        )} ft`}
                                    </Text>
                                </View>
                            );
                        },
                    }}
                    spacing={(width - 80) / Math.max(dataToUse.length - 1, 1)}
                    initialSpacing={0}
                    endSpacing={20}
                    scrollToEnd={false}
                    disableScroll
                    hideRules={false}
                    rulesColor='#E0E0E0'
                    rulesThickness={1}
                    hideYAxisText={false}
                    hideAxesAndRules={false}
                    yAxisTextStyle={{
                        color: '#666',
                        fontSize: 10,
                    }}
                    xAxisLabelTextStyle={{
                        color: '#666',
                        fontSize: 10,
                        textAlign: 'center',
                    }}
                    noOfSections={4}
                    maxValue={Math.max(...elevationArray.map(Number)) + 10}
                    minValue={Math.max(
                        0,
                        Math.min(...elevationArray.map(Number)) - 10,
                    )}
                    yAxisSuffix=' ft'
                    formatYLabel={(value) => `${value} ft`}
                    rotateLabel={false}
                    xAxisThickness={1}
                    yAxisThickness={1}
                    xAxisColor='#E0E0E0'
                    yAxisColor='#E0E0E0'
                    backgroundColor='transparent'
                    isAnimated={false}
                    showXAxisIndices={false}
                    showYAxisIndices={false}
                />
            </ChartContainer>
        </Body>
    );

    return (
        <>
            <SheetPadding />
            <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={[120, bottomSheet.chart.expanded]}
                enablePanDownToClose={!isChartActive}
                enableHandlePanningGesture={!isChartActive}
                enableContentPanningGesture={!isChartActive}
                handleIndicatorStyle={{
                    width: 35,
                    height: 5,
                    borderRadius: 5,
                    backgroundColor: theme?.colors?.sheetHandle || '#999',
                    marginTop: 6,
                }}
                backgroundComponent={(props) => (
                    <CustomBackground
                        {...props}
                        mapRef={mapRef}
                        sheetRef={sheetRef}
                        theme={theme}
                    />
                )}
            >
                <BottomSheetView style={{ marginTop: 0 }}>
                    {renderContent()}
                </BottomSheetView>
            </BottomSheet>
        </>
    );
}

GraphSheet.propTypes = propTypes;
GraphSheet.defaultProps = defaultProps;

export default withTranslation()(withNavigation(withTheme(GraphSheet)));

const Body = styled.View`
    height: 300px;
    background-color: ${(props) => props.theme.sheetBackground};
`;

const ChartContainer = styled.View`
    padding-bottom: 50px;
    padding-top: 10px;
    padding-horizontal: 20px;
`;
