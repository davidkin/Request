/* global  dragAndDrop, HttpRequest */

(function() {
  const request = new HttpRequest({ baseUrl: 'http://localhost:8000' });

  function render(fileList) {
    return `
    <ul class="list">
      ${fileList.length > 0
    ? fileList.map(el => `<li class='list-text'>${el}</li>`).join('\n')
    : 'List is empty!'}
    </ul>
  `;
  }

  class ListOfFiles {
    constructor(parentNode) {
      this.parentNode = parentNode;
      this.data = [];
      this.node = null;

      this.create();
    }

    create() {
      this.loadList().then(() => this.render);
      this.node = this.parentNode.firstElementChild;
    }

    render() {
      this.parentNode.innerHTML = render(this.data);
    }

    loadList() {
      request.get('/list', {}).then(data => (this.data = data));
    }

    remove() {
      this.parentNode.removeChild(this.node);
    }
  }

  window.ListOfFiles = ListOfFiles;
}());
// dragAndDrop(showBlock);

// function showFilesList(data) {
//   const showBlock = document.querySelector('.show-block');
//   const showList = document.querySelector('.show-list');

//   const list = document.createElement('ul');
//   list.className = 'list';

//   showList.innerHTML = 'Close list';

//   showBlock.classList.remove('delete');
//   showList.classList.remove('white');

//   showBlock.classList.add('block');
//   showList.classList.add('red');

//   createListElements(data, list);
//

//   showBlock.appendChild(list);
// }

// function createListElements(data, list) {
//   data.forEach(element => {
//     const listItem = document.createElement('li');
//     const link = document.createElement('span');
//     link.classList.add('list-text');

//     link.innerHTML = element;

//     list.appendChild(listItem);
//     listItem.appendChild(link);
//   });
// }

// function closeFileList() {
//   const showBlock = document.querySelector('.show-block');
//   const showList = document.querySelector('.show-list');

//   showBlock.removeChild(document.querySelector('.list'));

//   showList.classList.remove('red');
//   showBlock.classList.remove('block');

//   showBlock.classList.add('delete');
//   showList.classList.add('white');

//   showList.innerHTML = 'Show List';
// }