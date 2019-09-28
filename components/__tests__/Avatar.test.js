import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import Avatar from '../Avatar';

const mockStore = configureMockStore();
const store = mockStore({
    userReducer: {
        avatar: 'https://patdugan.me/images/me.jpg',
    },
});

test('Avatar renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <Avatar />
            </Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
