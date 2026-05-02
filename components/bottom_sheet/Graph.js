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
  onActiveChange: PropTypes.func,
};

const { width } = Dimensions.get('window');

const MAX_CHART_POINTS = 50;
const POSITION_UPDATE_THRESHOLD = 0.008;

function CustomBackground({ style = null, mapRef, sheetRef, theme }) {
  return (
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
}

CustomBackground.propTypes = {
  style: PropTypes.object,
  mapRef: PropTypes.object.isRequired,
  sheetRef: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function PointerLabel({ value = 0 }) {
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
        {`${Math.round(value || 0)} ft`}
      </Text>
    </View>
  );
}

PointerLabel.propTypes = {
  value: PropTypes.number,
};

function GraphSheet({
  sheetRef,
  mapRef = {},
  elevationArray,
  hike,
  height = 200,
  t,
  onPositionChange = () => {},
  onActiveChange = () => {},
  theme,
}) {
  const { distance, elevation } = hike;
  const lastPositionRef = React.useRef(-1);
  const [isChartActive, setIsChartActive] = React.useState(false);

  const { chartData, step } = React.useMemo(() => {
    const stepValue = Math.max(
      1,
      Math.floor(elevationArray.length / MAX_CHART_POINTS)
    );
    const reducedElevations = elevationArray.filter(
      (_, index) => index % stepValue === 0
    );

    const labelPositions = new Set();
    const data = reducedElevations.map((elevationValue, index) => {
      const originalIndex = index * stepValue;
      const distanceAtPoint =
        (originalIndex / elevationArray.length) * distance;

      let labelText = '';
      const roundedDistance = Math.round(distanceAtPoint);

      if (index === 0) {
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

    return { chartData: data, step: stepValue };
  }, [elevationArray, distance]);

  const { maxValue, minValue } = React.useMemo(() => {
    let max = -Infinity;
    let min = Infinity;
    for (const value of elevationArray) {
      const numeric = Number(value);
      if (numeric > max) max = numeric;
      if (numeric < min) min = numeric;
    }
    return {
      maxValue: max + 10,
      minValue: Math.max(0, min - 10),
    };
  }, [elevationArray]);

  const renderPointerLabel = React.useCallback(
    items => {
      // Schedule position update after render to avoid setState during render.
      setTimeout(() => {
        if (!items || items.length === 0) return;

        const currentValue = items[0].value;
        const dataPointIndex = chartData.findIndex(
          point => point.value === currentValue
        );
        if (dataPointIndex < 0) return;

        const originalArrayIndex = dataPointIndex * step;
        const position = originalArrayIndex / (elevationArray.length - 1);

        if (
          Math.abs(position - lastPositionRef.current) >
          POSITION_UPDATE_THRESHOLD
        ) {
          lastPositionRef.current = position;
          onPositionChange(Math.max(0, Math.min(1, position)));
        }
      }, 0);

      return <PointerLabel value={items[0]?.value} />;
    },
    [chartData, elevationArray.length, onPositionChange, step]
  );

  const renderBackgroundComponent = React.useCallback(
    backgroundProps => (
      <CustomBackground
        {...backgroundProps}
        mapRef={mapRef}
        sheetRef={sheetRef}
        theme={theme}
      />
    ),
    [mapRef, sheetRef, theme]
  );

  const handleTouchStart = React.useCallback(() => {
    setIsChartActive(true);
    onActiveChange(true);
  }, [onActiveChange]);

  const handleTouchEnd = React.useCallback(() => {
    setIsChartActive(false);
    onActiveChange(false);
  }, [onActiveChange]);

  const headerItems = React.useMemo(
    () => [
      {
        label: t('sheet.elevation.label.distance'),
        subtext: t('sheet.elevation.distance', {
          unit: t('sheet.elevation.unit.miles'),
          distance,
        }),
      },
      {
        label: t('sheet.elevation.label.elevation'),
        subtext: t('sheet.elevation.distance', {
          unit: t('sheet.elevation.unit.feet'),
          distance: elevation.toLocaleString(),
        }),
      },
    ],
    [t, distance, elevation]
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
        backgroundComponent={renderBackgroundComponent}
      >
        <BottomSheetView style={{ marginTop: 0 }}>
          <Body>
            <Header>
              {headerItems.map(({ label, subtext }) => (
                <HeaderItem key={label}>
                  <HeaderLabel>{label}</HeaderLabel>
                  <HeaderSubtext>{subtext}</HeaderSubtext>
                </HeaderItem>
              ))}
            </Header>
            <ChartContainer
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <LineChart
                data={chartData}
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
                  pointerLabelComponent: renderPointerLabel,
                }}
                spacing={(width - 80) / Math.max(chartData.length - 1, 1)}
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
                maxValue={maxValue}
                minValue={minValue}
                yAxisSuffix=' ft'
                formatYLabel={value => `${value} ft`}
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
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

GraphSheet.propTypes = propTypes;

export default withTranslation()(withNavigation(withTheme(GraphSheet)));

const Body = styled.View`
  height: 300px;
  background-color: ${props => props.theme.sheetBackground};
`;

const ChartContainer = styled.View`
  padding-bottom: 50px;
  padding-top: 10px;
  padding-horizontal: 20px;
`;
