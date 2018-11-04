import DEFAULT_USERS from './data';
import {REMOVE_USER_ACTION} from './actions';

const defaultState = {
    users: DEFAULT_USERS
};
const defaultAction = {
    type: 'EMPTY'
};

const reducer = (state = defaultState, action = defaultAction) => {
    switch (action.type) {
    case REMOVE_USER_ACTION:
        return removeUser(state, action.payload);
    default:
        return state;
    }
};

function removeUser(state, idToRemove) {
    return Object.assign({}, state, {
        users: state.users
            .filter((user) => {
                return user.id !== idToRemove;
            }),
    });
}

export default reducer;