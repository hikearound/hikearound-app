import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { withTranslation } from 'react-i18next';
import { openHikeScreen } from '@utils/Hike';
import { View, Name, MetaData } from '@styles/Lists';
import { withNavigation } from '@utils/Navigation';
import { opacities } from '@constants/Index';
import Highlight from '@components/search/Highlight';

const propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    shouldHighlight: PropTypes.bool,
    item: PropTypes.object,
    showTopBorder: PropTypes.bool,
    showBottomBorder: PropTypes.bool,
};

const defaultProps = {
    shouldHighlight: false,
    showTopBorder: true,
    showBottomBorder: false,
    item: {},
};

class HikeListItem extends React.PureComponent {
    getHikeData = async () => {
        const { id, navigation } = this.props;
        openHikeScreen(id, navigation, {});
    };

    renderName = () => {
        const { shouldHighlight, name, item } = this.props;

        if (shouldHighlight) {
            return <Highlight attribute='name' hit={item} />;
        }

        return <Name>{name}</Name>;
    };

    renderLocationHighlight = () => {
        const { item } = this.props;

        return (
            <>
                <Highlight attribute='city' hit={item} />
                <Highlight attribute='state' hit={item} />
            </>
        );
    };

    render() {
        const {
            location,
            distance,
            shouldHighlight,
            showTopBorder,
            showBottomBorder,
            t,
        } = this.props;

        return (
            <View
                shouldHighlight={shouldHighlight}
                showTopBorder={showTopBorder}
                showBottomBorder={showBottomBorder}
            >
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    onPress={() => {
                        this.getHikeData();
                    }}
                >
                    {this.renderName()}
                    <MetaData>
                        {shouldHighlight && this.renderLocationHighlight()}
                        {!shouldHighlight && location}
                        {t('hike.list', {
                            distance: distance.toFixed(1),
                        })}
                    </MetaData>
                </TouchableOpacity>
            </View>
        );
    }
}

HikeListItem.propTypes = propTypes;
HikeListItem.defaultProps = defaultProps;

export default withTranslation()(withNavigation(HikeListItem));
