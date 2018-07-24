import React from "react";
import ReactDOM from "react-dom";
import {add} from './add'

ReactDOM.render(<p>Hello World Again{add(2,4)}</p>, document.body.firstElementChild);
