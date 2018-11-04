import './style.scss';

import {createStore} from 'redux';
import reducer from './reducer';
import {removeUser} from './actions';
import {renderPage, page} from './utils';

const store = createStore(reducer);
initApp();

function initApp() {
    // Render all elements into root container and attach handlers
    renderPage(store.getState());
    initHandlers();

    // Update page on each store update
    store.subscribe(() => {
        console.log('Store was updated', store.getState());
        renderPage(store.getState());
        initHandlers();
    });
}

function initHandlers() {
    // Attach handlers for elements
    const removeButtons = page.getRemoveButtons();
    removeButtons.forEach((button) => {
        button.addEventListener('click', onRemoveClick);
    });
}

function onRemoveClick(event) {
    const userId = event.target.dataset.userId;
    store.dispatch(removeUser(userId));
}