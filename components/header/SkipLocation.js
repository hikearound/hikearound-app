import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { showAlert } from '../../utils/alert/Location';
import { spacing, opacities } from '../../constants/Index';
import HeaderText from '../../styles/Header';

const propTypes = {
    permissionAction: PropTypes.func.isRequired,
    openHomeScreen: PropTypes.func.isRequired,
};

class SkipLocation extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        const { openHomeScreen, permissionAction } = this.props;

        this.openHomeScreen = openHomeScreen.bind(this);
        this.permissionAction = permissionAction.bind(this);
    }

    render() {
        const { t } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={() =>
                    showAlert(t, this.openHomeScreen, this.permissionAction)
                }
            >
                <Text>Skip</Text>
            </TouchableOpacity>
        );
    }
}

SkipLocation.propTypes = propTypes;

export default SkipLocation;

const Text = styled(HeaderText)`
    margin-right: ${spacing.micro}px;
`;
