import React from "react";
import ClickEvent from "./ClickEvent";
import EventObject from "./EventObject";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";

const Assignment4 = () => {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div className="container">
      <h1>Assignment 4</h1>

      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject />
    </div>
  );
};
export default Assignment4;
