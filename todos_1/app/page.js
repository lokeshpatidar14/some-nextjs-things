import { Fragment } from "react";
import TodoHeader from "../components/TodoHeader";
import TodoForm from "../components/TodoForm";

export default function Home() {
  return (
    <Fragment>
      <TodoHeader />
      <TodoForm />
    </Fragment>
  );
}
