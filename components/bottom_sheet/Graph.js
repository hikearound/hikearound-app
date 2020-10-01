import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BottomSheet from 'reanimated-bottom-sheet';
import {
    ChartDot,
    ChartPath,
    ChartPathProvider,
    ChartXLabel,
    ChartYLabel,
    monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import { Dimensions } from 'react-native';
import { withTheme } from '../../utils/Themes';
import { bottomSheet } from '../../constants/Index';
import { withNavigation } from '../../utils/Navigation';
import SheetHeader from './Header';

const propTypes = {
    sheetRef: PropTypes.object.isRequired,
    elevationArray: PropTypes.array.isRequired,
};

const defaultProps = {};

export const { width } = Dimensions.get('window');

function GraphSheet({ sheetRef, elevationArray }) {
    const [selectedElevation, setSelectedElevation] = useState(0);
    const [selectedDistance, setSelectedDistance] = useState(0);

    const formatElevation = (value) => {
        'worklet';

        if (value === '') {
            return `${selectedElevation} ft`;
        }

        const elevation = value.toLocaleString('en-US', {
            maximumFractionDigits: 2,
        });

        setSelectedElevation(value);
        return `${elevation} ft`;
    };

    const formatDistance = (value) => {
        'worklet';

        if (value === '') {
            return `${selectedDistance} miles`;
        }

        setSelectedDistance(value);
        return `${value} miles`;
    };

    const renderContent = () => {
        const points = monotoneCubicInterpolation({
            data: elevationArray,
            range: 1000,
        });

        return (
            <Body>
                <ChartPathProvider
                    data={{ points, smoothingStrategy: 'bezier' }}
                >
                    <ChartPath
                        height={width / 2}
                        stroke='black'
                        width={width}
                        strokeWidth={2}
                        selectedStrokeWidth={2}
                    />
                    <ChartYLabel
                        format={formatElevation}
                        style={{
                            color: 'green',
                            margin: 4,
                        }}
                    />
                    <ChartXLabel
                        format={formatDistance}
                        style={{
                            color: 'red',
                            margin: 4,
                        }}
                    />
                    <ChartDot style={{ backgroundColor: 'blue' }} />
                </ChartPathProvider>
            </Body>
        );
    };

    const renderHeader = () => {
        return <SheetHeader />;
    };

    return (
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
    );
}

GraphSheet.propTypes = propTypes;
GraphSheet.defaultProps = defaultProps;

export default withNavigation(withTheme(GraphSheet));

const Body = styled.View`
    height: 500px;
    background-color: ${(props) => props.theme.sheetBackground};
`;
