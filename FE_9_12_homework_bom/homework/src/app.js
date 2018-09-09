const rootNode = document.getElementById('root');
let itemListStorage = [];

function createElement(element, attribute, inner) {
    if (typeof element === 'undefined') {
      return false;
    }
    if (typeof inner === 'undefined') {
      inner = '';
    }
    let el = document.createElement(element);
    if (typeof attribute === 'object') {
      for (let key in attribute) {
        if (attribute.hasOwnProperty(key)) {
        el.setAttribute(key, attribute[key]);
        }
       }
    }
    if (!Array.isArray(inner)) {
      inner = [inner];
    }
    for (let k = 0; k < inner.length; k++) {
      if (inner[k].tagName) {
        el.appendChild(inner[k]);
      } else {
        el.appendChild(document.createTextNode(inner[k]));
      }
    }
    return el;
}

const renderPage = {
  main(itemListStorage) {
    const section = createElement('section', {'id': 'section'});   
    const header = createElement('h1', {}, 'Simple TODO application');
    const addButton = createElement('button', {'id': 'add-new-task'}, 'Add new task');
    const todoList = createElement('ul', {'id': 'todo-list'});
    const emptyList = createElement('p', {'class': 'todo-empty'}, 'TODO is empty');

    addButton.onclick = function () {
      window.location.hash = '/add';
    };

    section.appendChild(header);
    section.appendChild(addButton);
    section.appendChild(todoList);
    section.appendChild(emptyList);

    if (itemListStorage.length) {
      for (let item of itemListStorage) {
        const li = createElement('li', {'id': item.id});
        const checkbox = createElement('button', {
          'class': item.isDone ? 'checkbox-done' : 'checkbox-empty'
        });
        const todoText = createElement('button', {
          'class': 'todo-text'         
        }, item.inputText);
        const remove = createElement('button', {'class': 'remove'});

        checkbox.onclick = function () {
          if (checkbox.className === 'checkbox-empty') {
            checkbox.className = 'checkbox-done';
            todoText.style.background = 'grey';
            storageData.makeItemDone(item.id);
            todoList.appendChild(li);
          }
        };

        todoText.onclick = function () {
          window.location.hash = `/modify/${item.id}`;
        };

        remove.onclick = function () {
          li.remove();
          storageData.removeItemID(item.id);
        };

        li.appendChild(checkbox);
        li.appendChild(todoText);
        li.appendChild(remove);
        todoList.appendChild(li);
      }
    }

    return section;
  },

  add() {
    const section = createElement('section', {'id': 'section'});
    const header = createElement('h1', {}, 'Add Task');
    const inputField = createElement('input', {'type': 'text'});
    const footer = createElement('footer');
    const cancelButton = createElement('button', {'class': 'cancel-button'}, 'Cancel');
    const saveButton = createElement('button', {
      'class': 'save-button',
      'disabled': 'true'
    }, 'Save changes');

    inputField.oninput = function () {
      const inputText = inputField.value.trim();

      saveButton.disabled = !inputText;

      if (event.key === 'Enter' && inputText) {
        saveButton.click();
      }
    };

    cancelButton.onclick = function () {
      window.location.hash = '/main';
    };

    saveButton.onclick = function () {
        storageData.add(inputField.value.trim());
        window.location.hash = '/main';
    };

    footer.appendChild(cancelButton);
    footer.appendChild(saveButton);
    section.appendChild(header);
    section.appendChild(inputField);
    section.appendChild(footer);

    return section;
  },

  modify(item) {
    const section = this.add();
    
    section.id = 'modify-section';
    section.querySelector('h1').textContent = 'Modify Item';
    section.querySelector('input').value = item.inputText;
    section.querySelector('.save-button').onclick = function () {
        storageData.changeInputText(item.id, section.querySelector('input').value.trim());
        window.location.hash = '/main';
    };

    return section;
  }
};

const storageData = {
  add: function (inputText) {
    const id = 'task_' + +new Date().getTime();
    const item = { inputText: inputText, id: id, isDone: false };
    itemListStorage.push(item);
    localStorage.setItem('itemListStorage', JSON.stringify(itemListStorage));

    return itemListStorage;
  },
  getList: function () {
    return JSON.parse(localStorage.getItem('itemListStorage'));
  },
  getItemID: function (id) {
    return this.getList().find(function (item) {
      return item.id === id;
    });
  },
  getDoneItem: function () {
    return this.getList().filter(function (item) {
      return item.isDone === true;
    });
  },
  getUndoneItem: function () {
    return this.getList().filter(function (item) {
      return item.isDone === false;
    });
  },
  getSorted: function () {
    return this.getUndoneItem().concat(this.getDoneItem());
  },
  makeItemDone: function (id) {
    const updatedList = this.getList().map(function (item) {
      if (item.id === id) {
        item.isDone = true;
      }

      return item;
    });

    localStorage.setItem('itemListStorage', JSON.stringify(updatedList));

    return itemListStorage;
  },
  changeInputText: function (id, inputText) {
    const updatedList = this.getList().map(function (item) {
      if (item.id === id) {
        item.inputText = inputText;
      }
      return item;
    });
    localStorage.setItem('itemListStorage', JSON.stringify(updatedList));
    return itemListStorage;
  },
  removeItemID: function (id) {
    const updatedList = this.getList().filter(function (item) {
      return item.id !== id;
    });
    localStorage.setItem('itemListStorage', JSON.stringify(updatedList));
    return itemListStorage;
  }
};

const router = {
  load() {
    const hash = window.location.hash;

    if (hash.endsWith('/add')) {
      this.add();
    } else if ((/\/modify\/task_\d+$/).test(hash)) {
      const id = hash.slice(hash.lastIndexOf('/') + 1);
      this.modify(id);
    } else {
      this.main();
    }
  },

  main() {
    window.history.pushState('', '/', window.location.pathname);  
    rootNode.innerHTML = '';
    rootNode.appendChild(renderPage.main(itemListStorage));
  },

  add() {    
    rootNode.innerHTML = '';
    rootNode.appendChild(renderPage.add());
  },

  modify(id) {
    const item = storageData.getItemID(id);    
    rootNode.innerHTML = '';
    rootNode.appendChild(renderPage.modify(item));
  }
}

window.onload = window.onhashchange = function () {
    if (localStorage.getItem('itemListStorage')) {
      itemListStorage = storageData.getSorted();
    }  
    router.load();
}