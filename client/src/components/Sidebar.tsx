import { Dispatch } from 'react';
import AllTodos from './AllTodos';
import CompletedTodos from './CompletedTodos';
import AllList from './AllList';
import CompletedList from './CompletedList';
import { groupTodosByDate, sortTodoGroups } from '../utils';
import { Todo, NavAction, NavbarState } from '../types';

interface SidebarPropsType {
  todos: Todo[];
  currentNav: NavbarState;
  dispatchCurrentNav: Dispatch<NavAction>;
}

const Sidebar = ({ todos, currentNav, dispatchCurrentNav }: SidebarPropsType) => {
  
  const completedTodos = todos.filter(todo => todo.completed);
  const allList: Array<[string, number]> = groupTodosByDate(todos);
  const completedList: Array<[string, number]> = groupTodosByDate(completedTodos);
  
  sortTodoGroups(allList);
  sortTodoGroups(completedList);
  
  const switchNav = (e: React.MouseEvent<HTMLDListElement>) => {
    const clickedNav = e.currentTarget;
    //type assertion for dom element
    const group = e.currentTarget.dataset.title as string;
    const isCompleted = clickedNav.hasAttribute("id") && group !== "All Todos";
    dispatchCurrentNav({
      type: "Group",
      group,
      completed: isCompleted
    });
  }
  
  return (
  <div id="sidebar" >
    <section id="all">
      <div id="all_todos" data-title="All Todos" onClick={() => dispatchCurrentNav({ type: "All Todos" })}>
        <AllTodos todos={todos} currentNav={currentNav}/>
      </div>
      <article id="all_lists">
       <AllList allList={allList} onSwitchNav={switchNav} currentNav={currentNav}/>
      </article>
    </section>
    <section className="completed" id="completed_items">
      <div id="completed_todos" data-title="Completed" onClick={() => dispatchCurrentNav({ type: "Completed" })}>
        <CompletedTodos todos={completedTodos} currentNav={currentNav}/>
      </div>
      <article id="completed_lists">
        <CompletedList completedList={completedList} onSwitchNav={switchNav} currentNav={currentNav}/>
      </article>
    </section>
  </div>
  )
}

export default Sidebar;