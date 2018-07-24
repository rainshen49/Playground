import React from "react";
import ReactDOM from "react-dom";
import { add } from './add';
ReactDOM.render(React.createElement("p", null,
    "Hello World Again",
    add(2, 4)), document.body.firstElementChild);
