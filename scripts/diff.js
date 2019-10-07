import {DiffDOM} from "diff-dom";

function component() {
    const element = document.createElement('div');
    var dd = new DiffDOM();
  
    element.innerHTML = "Hello world";
  
    return element;
  }
  
  document.body.appendChild(component());
  