import React from 'react';
import PropTypes from 'prop-types';
import HikeList from './HikeList';

const propTypes = {
    hikeData: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    maybeShowEmptyState: PropTypes.bool.isRequired,
};

class ProfileBody extends React.PureComponent {
    render() {
        const { hikeData, loading, maybeShowEmptyState } = this.props;
        const scrollRef = React.createRef();

        return (
            <HikeList
                scrollRef={scrollRef}
                hikeData={hikeData}
                loading={loading}
                maybeShowEmptyState={maybeShowEmptyState}
            />
        );
    }
}

ProfileBody.propTypes = propTypes;

export default ProfileBody;
