import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { connect } from 'react-redux';
import GlobalMap from '../components/GlobalMap';
import MapSearch from '../components/MapSearch';
import { withTheme, SetBarStyle } from '../utils/Themes';
import {
    spacing,
    fontSizes,
    opacities,
    bottomSheet,
    transparentColors,
} from '../constants/Index';
import { pageFeed } from '../utils/Feed';
import { openHikeScreen, getHikeData } from '../utils/Hike';
import { withNavigation } from '../utils/Navigation';

const propTypes = {
    position: PropTypes.object.isRequired,
    selectedHike: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const defaultProps = {
    selectedHike: null,
};

function mapStateToProps(state) {
    return {
        selectedHike: state.mapReducer.selectedHike,
        position: state.userReducer.currentPosition,
    };
}

function mapDispatchToProps() {
    return {};
}

class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.bottomSheetRef = React.createRef();
        this.searchInputRef = React.createRef();
        this.showHikeSheet = this.showHikeSheet.bind(this);

        this.state = {
            hikeData: [],
            sortDirection: 'desc',
            pageSize: 20,
            sheetData: {},
        };
    }

    async componentDidMount() {
        this.getHikeData();
        this.setBarStyle();
    }

    async componentDidUpdate(prevProps) {
        const { selectedHike } = this.props;

        if (prevProps.selectedHike !== selectedHike && selectedHike) {
            const sheetData = await getHikeData(selectedHike);
            this.setSheetData(sheetData);
        }
    }

    setBarStyle = () => {
        const { theme } = this.props;

        if (theme.dark) {
            this.setState({ barStyle: 'light-content' });
        } else {
            this.setState({ barStyle: 'dark-content' });
        }
    };

    setSheetData = (sheetData) => {
        this.setState({ sheetData });
    };

    showHikeSheet = () => {
        this.bottomSheetRef.current.snapTo(1);
        // this.searchInputRef.current.refs.textInput.blur();
    };

    hideHikeSheet = () => {
        this.bottomSheetRef.current.snapTo(0);
    };

    renderContent = () => {
        const { selectedHike, navigation } = this.props;
        const { sheetData } = this.state;

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

    getHikeData = async (lastKey) => {
        const { sortDirection, pageSize } = this.state;
        const { position } = this.props;

        const { data } = await pageFeed(
            pageSize,
            lastKey,
            position,
            sortDirection,
        );

        this.setState({ hikeData: data });
    };

    render() {
        const { position } = this.props;
        const { hikeData, barStyle } = this.state;

        return (
            <View>
                <SetBarStyle barStyle={barStyle} />
                <MapSearch
                    searchInputRef={this.searchInputRef}
                    hideHikeSheet={this.hideHikeSheet}
                />
                <GlobalMap
                    position={position}
                    hikeData={hikeData}
                    showHikeSheet={this.showHikeSheet}
                />
                <BottomSheet
                    snapPoints={[
                        bottomSheet.starting,
                        bottomSheet.expanded,
                        bottomSheet.collapsed,
                    ]}
                    renderContent={this.renderContent}
                    renderHeader={this.renderHeader}
                    enabledInnerScrolling={false}
                    ref={this.bottomSheetRef}
                />
            </View>
        );
    }
}

MapScreen.propTypes = propTypes;
MapScreen.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withNavigation(withTheme(MapScreen)));

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
