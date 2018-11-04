const REMOVE_USER_ACTION = 'REMOVE_USER_ACTION';

const removeUser = (userIndex) => {
    return {
        type: REMOVE_USER_ACTION,
        payload: userIndex,
    };
};

export {
    REMOVE_USER_ACTION,
    removeUser,
};