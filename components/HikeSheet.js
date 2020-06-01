import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { withTheme } from '../utils/Themes';
import {
    spacing,
    fontSizes,
    opacities,
    bottomSheet,
    transparentColors,
} from '../constants/Index';
import { openHikeScreen } from '../utils/Hike';
import { withNavigation } from '../utils/Navigation';

const propTypes = {
    sheetRef: PropTypes.object.isRequired,
    sheetData: PropTypes.object.isRequired,
    selectedHike: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const defaultProps = {
    selectedHike: null,
};

class HikeSheet extends React.Component {
    renderContent = () => {
        const { selectedHike, navigation, sheetData } = this.props;

        if (sheetData) {
            return (
                <Body>
                    <TouchableOpacity
                        onPress={() => {
                            openHikeScreen(selectedHike, navigation);
                        }}
                        activeOpacity={opacities.regular}
                    >
                        <Text>{sheetData.name}</Text>
                    </TouchableOpacity>
                </Body>
            );
        }
        return null;
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

const Text = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.small}px;
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
    height: 5px;
    border-radius: ${spacing.micro}px;
    margin-bottom: ${spacing.micro}px;
    background-color: ${(props) => props.theme.sheetHandle};
`;
