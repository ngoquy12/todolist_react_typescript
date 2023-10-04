import React from "react";
import Todo_Form from "../components/Todo_Form";
import Todo_List from "../components/Todo_List";

const TodoPage: React.FC = () => {
  return (
    <div className="w-1/2 m-auto">
      <Todo_Form />
      {/* <Todo_List /> */}
    </div>
  );
};

export default TodoPage;
