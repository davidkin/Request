/* eslint-disable */

function showFilesList(data) {
  const block = document.querySelector('.show-block');
  const showList = document.querySelector('.show-list');
  const list = document.createElement('ul');

  list.className = 'list';

  document.querySelector('.show-block').style.display = 'block';
  showList.innerHTML = 'Close list';
  showList.style.color = '#de0a4e';
  showList.style.borderColor = '#de0a4e';

  createListElement(data, list);
  dragAndDrop(block);

  block.appendChild(list);
}

function createListElements(data, list) {
  data.forEach(element => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');

    link.innerHTML = element;
    link.style.color = '#fff';
    link.style.wordWrap = 'break-word';

    link.setAttribute('href', 'javascript:void(0);');

    list.appendChild(listItem);
    listItem.appendChild(link);
  });
}