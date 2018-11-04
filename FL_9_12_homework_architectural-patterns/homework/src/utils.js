import {REMOVE_USER_ACTION} from './actions';

const SELECTORS = {
    REMOVE_BUTTON: '.remove-button',
    ROOT_CONTAINER: '#root',
    USERS_COUNT: '#users-count'
};

const page = {
    getRemoveButtons() {
        return document.querySelectorAll(SELECTORS.REMOVE_BUTTON);
    },
    getRootContainer() {
        return document.querySelector(SELECTORS.ROOT_CONTAINER);
    }
};

const renderPage = (state) => {
    const userRows = state.users.map((user) => {
        return `
    <tr class="user-row">
      <td><img src="${user.picture}" alt="user photo"></td>
      <td>${user.name}</td>
      <td>${user.location}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.timezone}</td>
      <td>
        <button 
          data-action-type="${REMOVE_USER_ACTION}" 
          data-user-id="${user.id}" 
          class="${SELECTORS.REMOVE_BUTTON.slice(1)}" 
          type="button"
        >
        Remove
        </button>
      </td>
    </tr>`;
    });
    page.getRootContainer().innerHTML = `
    <header class="header">
    <div class="user-search">
        Search by name: <input type="text" placeholder="Enter user name...">
    </div>
    </header>
    <table>
    <tr class="table-header">
        <th>Photo</th>
        <th>Name</th>
        <th>Adress</th>
        <th>Email</th>
        <th>Phone number</th>
        <th>Timezone</th>
        <th>Actions</th>
    </tr>
    ${userRows.join('\n')}
    </table>
    <footer class="footer">
    <div class="user-count">
        Displayed ${state.users.length} users out of <span id="${SELECTORS.USERS_COUNT.slice(1)}">${state.users.length}</span>
    </div>
    <input type="button" class="load-more" value="LOAD MORE" />
    </footer>`;
};

export {page, renderPage};