import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { connect } from 'react-redux';
import GlobalMap from '../components/GlobalMap';
import { withTheme } from '../utils/Themes';
import { spacing, fontSizes, opacities } from '../constants/Index';
import { pageFeed } from '../utils/Feed';
import { openHikeScreen } from '../utils/Hike';
import { withNavigation } from '../utils/Navigation';

const handleWidth = '30px';
const handleHeight = '5px';

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

        this.state = {
            hikeData: [],
            sortDirection: 'desc',
            pageSize: 20,
        };
    }

    async componentDidMount() {
        this.getHikeData();
    }

    renderContent = () => {
        const { theme, selectedHike, navigation } = this.props;

        return (
            <Body style={{ backgroundColor: theme.colors.sheetBackground }}>
                <TouchableOpacity
                    onPress={() => {
                        openHikeScreen(selectedHike, navigation);
                    }}
                    activeOpacity={opacities.regular}
                >
                    <Text>{selectedHike}</Text>
                </TouchableOpacity>
            </Body>
        );
    };

    renderHeader = () => {
        const { theme } = this.props;

        return (
            <Header style={{ backgroundColor: theme.colors.sheetBackground }}>
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
        const { hikeData } = this.state;

        return (
            <>
                <GlobalMap position={position} hikeData={hikeData} />
                <BottomSheet
                    snapPoints={[35, 100, 35]}
                    renderContent={this.renderContent}
                    renderHeader={this.renderHeader}
                />
            </>
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
    height: 100px;
    padding: ${spacing.small}px;
`;

const Text = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.small}px;
`;

const Header = styled.View`
    padding-top: ${spacing.small}px;
    border-top-left-radius: ${spacing.tiny}px;
    border-top-right-radius: ${spacing.tiny}px;
`;

const HeaderPanel = styled.View`
    align-items: center;
`;

const HeaderHandle = styled.View`
    width: ${handleWidth};
    height: ${handleHeight};
    border-radius: ${spacing.micro}px;
    margin-bottom: ${spacing.micro}px;
    background-color: ${(props) => props.theme.sheetHandle};
`;
