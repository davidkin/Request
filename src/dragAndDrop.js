function dragAndDrop(elem) {
  function getCoords(el) {
    const box = el.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  elem.onmousedown = function(e) {
    const coords = getCoords(elem);
    const shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;

    elem.style.position = 'absolute';
    document.body.appendChild(elem);

    function moveAt(e) {
      elem.style.left = `${e.pageX - shiftX}px`;
      elem.style.top = `${e.pageY - shiftY}px`;
    }

    moveAt(e);

    elem.style.zIndex = 1000;

    document.onmousemove = function(e) {
      moveAt(e);
    };

    elem.onmouseup = function() {
      document.onmousemove = null;
      elem.onmouseup = null;
    };
  };

  elem.ondragstart = function() {
    return false;
  };
}