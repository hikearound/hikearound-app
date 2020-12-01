import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ReadMore from 'react-native-read-more-text';
import { connect } from 'react-redux';
import Subtitle from '../Subtitle';
import FavoriteButton from '../FavoriteButton';
import { defaultProps } from '../../constants/states/TextContent';
import { truncateText } from '../../utils/Text';
import {
    ActionText,
    TitleText,
    LocationText,
    DescriptionText,
} from '../../styles/Text';

const propTypes = {
    name: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    description: PropTypes.string,
    hid: PropTypes.string.isRequired,
    distance: PropTypes.number,
    numberOfLines: PropTypes.number,
    placement: PropTypes.string,
    isExpandable: PropTypes.bool,
    truncateName: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        favoriteHikes: state.userReducer.favoriteHikes,
    };
}

function mapDispatchToProps() {
    return {};
}

class TextContent extends React.Component {
    constructor(props, context) {
        super(props, context);
        const { name } = this.props;

        this.state = {
            description: undefined,
            hikeName: name,
        };
    }

    componentDidMount() {
        this.updateDescription();
        this.maybeTruncateName();
    }

    componentDidUpdate(prevProps) {
        const { name } = this.props;

        if (prevProps.name !== name) {
            this.maybeTruncateName();
            this.updateDescription();
        }
    }

    renderTruncatedFooter = (handlePress) => {
        const { t, isExpandable } = this.props;

        if (isExpandable) {
            return (
                <ActionText onPress={() => this.expandText(handlePress)}>
                    {t('label.common.read')}
                </ActionText>
            );
        }

        return null;
    };

    expandText = (handlePress) => {
        const { description } = this.props;

        handlePress();
        this.setState({ description });
    };

    renderRevealedFooter = () => {
        return null;
    };

    updateDescription() {
        const { description } = this.props;

        if (description) {
            this.setState({
                description: description.replace(/(\n\n)/gm, ' '),
            });
        }
    }

    maybeTruncateName() {
        const { name, truncateName } = this.props;

        this.setState({ hikeName: name });

        if (truncateName) {
            if (name.length >= 25) {
                this.setState({ hikeName: truncateText(name, 25) });
            }
        }
    }

    render() {
        const {
            city,
            state,
            hid,
            distance,
            numberOfLines,
            placement,
            name,
            t,
        } = this.props;
        const { description, hikeName } = this.state;
        const location = `${city}, ${state}`;

        return (
            <>
                <TitleText>{hikeName}</TitleText>
                <LocationText>{location}</LocationText>
                <FavoriteButton
                    name={name}
                    hid={hid}
                    distance={distance}
                    city={city}
                    state={state}
                    placement={placement}
                />
                <Subtitle text={t('label.heading.description')} />
                <ReadMore
                    numberOfLines={numberOfLines}
                    renderTruncatedFooter={this.renderTruncatedFooter}
                    renderRevealedFooter={this.renderRevealedFooter}
                >
                    <DescriptionText>{description}</DescriptionText>
                </ReadMore>
            </>
        );
    }
}

TextContent.propTypes = propTypes;
TextContent.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(TextContent));
