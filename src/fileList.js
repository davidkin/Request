/* eslint-disable */

function showFilesList(data) {
  const showBlock = document.querySelector('.show-block');
  const showList = document.querySelector('.show-list');

  const list = document.createElement('ul');
  list.className = 'list';

  showList.innerHTML = 'Close list';

  showBlock.classList.remove('delete');
  showList.classList.remove('white');

  showBlock.classList.add('block');
  showList.classList.add('red');

  createListElements(data, list);
  dragAndDrop(showBlock);

  showBlock.appendChild(list);
}

function createListElements(data, list) {
  data.forEach(element => {
    const listItem = document.createElement('li');
    const link = document.createElement('span');
    link.classList.add('list-text');

    link.innerHTML = element;

    list.appendChild(listItem);
    listItem.appendChild(link);
  });
}

function closeFileList() {
  const showBlock = document.querySelector('.show-block');
  const showList = document.querySelector('.show-list');

  showBlock.removeChild(document.querySelector('.list'));

  showList.classList.remove('red');
  showBlock.classList.remove('block');

  showBlock.classList.add('delete');
  showList.classList.add('white');

  showList.innerHTML = 'Show List';
}