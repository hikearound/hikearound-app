import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { withTheme } from '@utils/Themes';
import { colors, fontSizes, spacing, fontWeights } from '@constants/Index';

const propTypes = {
    selectedIndices: PropTypes.array,
    selectedIndex: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    multiple: PropTypes.bool,
    values: PropTypes.array,
    onTabPress: PropTypes.func,
};

const defaultProps = {
    selectedIndices: [],
    selectedIndex: null,
    title: null,
    type: null,
    multiple: false,
    values: [],
    onTabPress: () => {},
};

class FilterSegmentedControl extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        const {
            selectedIndices,
            selectedIndex,
            title,
            type,
            multiple,
            values,
            onTabPress,
            theme,
        } = this.props;

        return (
            <ControlWrapper>
                <Title>{title}</Title>
                <SegmentedControlTab
                    tabStyle={{
                        borderColor: theme.colors.modalButtonBorder,
                        backgroundColor: theme.colors.rootBackground,
                    }}
                    activeTabStyle={{
                        backgroundColor: colors.purple,
                        color: colors.white,
                        borderColor: theme.colors.itemBorder,
                    }}
                    tabTextStyle={{
                        color: theme.colors.text,
                    }}
                    multiple={multiple}
                    values={values}
                    selectedIndices={selectedIndices}
                    selectedIndex={selectedIndex}
                    onTabPress={(index) => onTabPress(index, type)}
                />
            </ControlWrapper>
        );
    }
}

FilterSegmentedControl.propTypes = propTypes;
FilterSegmentedControl.defaultProps = defaultProps;

export default withTheme(FilterSegmentedControl);

const ControlWrapper = styled.View`
    margin-top: ${spacing.medium}px;
    padding-bottom: ${spacing.medium}px;
    border-color: ${(props) => props.theme.itemBorder};
    border-bottom-width: 1px;
`;

const Title = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.large}px;
    line-height: ${fontSizes.large}px;
    font-weight: ${fontWeights.bold};
    margin-bottom: ${spacing.tiny}px;
`;
