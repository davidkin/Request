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
      this.loadList().then(() => this.render());
      dragAndDrop(this.parentNode);
    }

    render() {
      this.parentNode.innerHTML = render(this.data);
      this.node = this.parentNode.firstElementChild;
    }

    loadList() {
      return request.get('/list', {}).then(data => (this.data = JSON.parse(data)));
    }

    remove() {
      this.parentNode.removeChild(this.node);
    }
  }

  window.ListOfFiles = ListOfFiles;
}());