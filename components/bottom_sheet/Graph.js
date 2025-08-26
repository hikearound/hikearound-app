import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BottomSheet from 'reanimated-bottom-sheet';
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
import SheetHeader from '@components/bottom_sheet/Header';

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

function GraphSheet({
    sheetRef,
    mapRef,
    elevationArray,
    hike,
    height,
    t,
    onPositionChange,
}) {
    const { distance, elevation } = hike;
    const lastPositionRef = React.useRef(-1);

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
            <ChartContainer>
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
                        pointerLabelComponent: (items) => {
                            console.log(
                                'pointerLabelComponent called with items:',
                                items,
                            );
                            // Find the index by matching the value with our data
                            if (items && items.length > 0 && onPositionChange) {
                                const currentValue = items[0].value;
                                const dataPointIndex = dataToUse.findIndex(
                                    (point) => point.value === currentValue,
                                );
                                console.log(
                                    'Found dataPointIndex:',
                                    dataPointIndex,
                                    'for value:',
                                    currentValue,
                                );

                                if (dataPointIndex >= 0) {
                                    const position =
                                        dataPointIndex / (dataToUse.length - 1);
                                    console.log(
                                        'pointerLabelComponent calculated position:',
                                        position,
                                    );

                                    // Only call onPositionChange if position actually changed
                                    if (
                                        Math.abs(
                                            position - lastPositionRef.current,
                                        ) > 0.01
                                    ) {
                                        lastPositionRef.current = position;
                                        // Use setTimeout to break the synchronous update cycle
                                        setTimeout(() => {
                                            onPositionChange(
                                                Math.max(
                                                    0,
                                                    Math.min(1, position),
                                                ),
                                            );
                                        }, 0);
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

    const renderHeader = () => (
        <SheetHeader
            mapRef={mapRef}
            sheetRef={sheetRef}
            shouldShowLocationButton
        />
    );

    return (
        <>
            <SheetPadding />
            <BottomSheet
                snapPoints={[
                    bottomSheet.chart.expanded,
                    bottomSheet.chart.expanded,
                    bottomSheet.chart.collapsed,
                ]}
                renderContent={renderContent}
                renderHeader={renderHeader}
                enabledInnerScrolling={false}
                ref={sheetRef}
            />
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
