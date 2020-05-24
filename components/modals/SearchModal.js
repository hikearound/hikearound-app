import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Modal } from 'react-native';
import { InstantSearch } from 'react-instantsearch-native';
import SearchBox from '../search/SearchBox';
import StateResults from '../search/StateResults';
import { withTheme } from '../../utils/Themes';
import InfiniteHits from '../search/InfiniteHits';
import { ModalBody } from '../../styles/Modals';
import { RootView } from '../../styles/Screens';
import ModalBase from './ModalBase';
import { searchClient } from '../../constants/Search';

function mapStateToProps(state) {
    return {
        action: state.modalReducer.action,
    };
}

class SearchModal extends ModalBase {
    constructor(props) {
        super(props);
        const { searchState } = this.props;

        this.state = {
            modalVisible: false,
            searchState: searchState || {},
        };
    }

    onSearchStateChange = (nextState) => {
        const { searchState } = this.state;

        this.setState({
            searchState: { ...searchState, ...nextState },
        });
    };

    renderModalHeader = () => {
        return <SearchBox />;
    };

    renderModalBody = () => {
        return (
            <ModalBody>
                <StateResults>
                    <InfiniteHits />
                </StateResults>
            </ModalBody>
        );
    };

    render() {
        const { modalVisible, searchState } = this.state;
        const { animationType, t } = this.props;

        return (
            <Modal
                animationType={animationType}
                transparent={false}
                visible={true}
            >
                <RootView>
                    <InstantSearch
                        searchClient={searchClient}
                        indexName='hikes'
                        searchState={searchState}
                        onSearchStateChange={this.onSearchStateChange}
                    >
                        {this.renderModalHeader(t)}
                        {this.renderModalBody()}
                    </InstantSearch>
                </RootView>
            </Modal>
        );
    }
}

export default connect(mapStateToProps)(
    withTranslation()(withTheme(SearchModal)),
);
