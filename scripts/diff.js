import {DiffDOM} from "diff-dom";

function component() {
    const element = document.createElement('div');
    dd = new diffDOM.DiffDOM();
  
    element.innerHTML = "Hello world";
  
    return element;
  }
  
  document.body.appendChild(component());
  