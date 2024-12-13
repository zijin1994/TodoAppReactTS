import { Todo, NavbarState } from "../types";


const AllTodos = ({ todos, currentNav }: { todos: Todo[]; currentNav: NavbarState }) => {
  const isActive = (currentNav.nav === "All Todos");
  return (
    <header data-title="All Todos" data-total={todos.length} id="all_header" className={isActive ? "active" : ""}>
      <dl>
       <dt>All Todos</dt>
       <dd>{todos.length}</dd>
      </dl>
    </header> 
  );
}

export default AllTodos;