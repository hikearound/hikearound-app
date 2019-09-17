import React from 'react';
import PropTypes from 'prop-types';
import HikeList from './HikeList';

const propTypes = {
    hikes: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    maybeShowEmptyState: PropTypes.bool.isRequired,
};

class ProfileBody extends React.PureComponent {
    render() {
        const { hikes, loading, maybeShowEmptyState } = this.props;

        return (
            <HikeList
                hikes={hikes}
                loading={loading}
                maybeShowEmptyState={maybeShowEmptyState}
            />
        );
    }
}

ProfileBody.propTypes = propTypes;

export default ProfileBody;
