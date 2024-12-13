import { Todo, NavbarState } from "../types";


const CompletedTodos = ({ todos, currentNav }:{ todos: Todo[]; currentNav: NavbarState }) => {
  return (
    <header data-title="Completed" data-total={todos.length} id="all_header" className={currentNav.nav ==="Completed" ? "active" : ""}>
      <dl>
       <dt>Completed</dt>
       <dd>{todos.length}</dd>
      </dl>
    </header> 
  );
}

export default CompletedTodos;