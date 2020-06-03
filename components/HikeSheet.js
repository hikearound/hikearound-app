import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { withTheme } from '../utils/Themes';
import TextContent from './hike/TextContent';
import SheetActions from './SheetActions';
import { spacing, bottomSheet, transparentColors } from '../constants/Index';
import { withNavigation } from '../utils/Navigation';

const propTypes = {
    sheetRef: PropTypes.object.isRequired,
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
                {sheetData && selectedHike && (
                    <View>
                        <TextContent
                            name={sheetData.name}
                            city={sheetData.city}
                            id={selectedHike}
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
        return (
            <Header>
                <HeaderPanel>
                    <HeaderHandle />
                </HeaderPanel>
            </Header>
        );
    };

    render() {
        const { sheetRef } = this.props;

        return (
            <BottomSheet
                snapPoints={[
                    bottomSheet.starting,
                    bottomSheet.expanded,
                    bottomSheet.collapsed,
                ]}
                renderContent={this.renderContent}
                renderHeader={this.renderHeader}
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
    height: ${bottomSheet.expanded}px;
    padding: ${spacing.small}px;
    background-color: ${(props) => props.theme.sheetBackground};
`;

const Header = styled.View`
    padding-top: ${spacing.small}px;
    border-top-left-radius: ${spacing.tiny}px;
    border-top-right-radius: ${spacing.tiny}px;
    box-shadow: 0 -4px 3px ${transparentColors.grayLight};
    background-color: ${(props) => props.theme.sheetBackground};
`;

const HeaderPanel = styled.View`
    align-items: center;
`;

const HeaderHandle = styled.View`
    width: 35px;
    height: ${spacing.micro}px;
    border-radius: ${spacing.micro}px;
    margin-bottom: ${spacing.micro}px;
    background-color: ${(props) => props.theme.sheetHandle};
`;
