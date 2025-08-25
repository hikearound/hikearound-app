import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

const propTypes = {
    mediaHeight: PropTypes.number,
};

const defaultProps = {
    mediaHeight: 125,
};

class Ad extends React.PureComponent {
    render() {
        // Facebook Ads removed - return empty view for now
        return <AdWrapper />;
    }
}

Ad.propTypes = propTypes;
Ad.defaultProps = defaultProps;

export default withTranslation()(Ad);

const AdWrapper = styled.View`
    display: flex;
`;

const Promoted = styled.Text`
    display: flex;
`;

const BodyText = styled.Text`
    display: flex;
`;

const CtaText = styled.Text`
    display: flex;
`;

const Headline = styled.Text`
    display: flex;
`;
