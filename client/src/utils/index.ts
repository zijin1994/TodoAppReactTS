import { Todo, DueDate } from "../types";

export const formatDate = (dueDate: DueDate) => {
  if (dueDate.year === "YYYY" || dueDate.month === "MM") return "No Due Date";
  
  const year = dueDate.year.slice(2);
  return `${dueDate.month.padStart(2, "0")}/${year}`;
};

export const sortTodos = (todos: Todo[]) => {
  return [...todos].sort((a, b) => {
    if (a.completed) return 1;
    else if (b.completed) return -1;
    else return 0;
  });
};

export const sortTodoGroups = (groups: Array<[string, number]>) => {
  return groups.sort((groupA, groupB) => {
    if (groupA[0] === "No Due Date" || groupB[0] === "No Due Date"){
      if (groupA[0] === "No Due Date") return -1;
      else return 1;
    } else {
      let [monthA, yearA] = groupA[0].split("/").map(Number);
      let [monthB, yearB] = groupB[0].split("/").map(Number);

      let totalMonthA = yearA * 12 + monthA;
      let totalMonthB = yearB * 12 + monthB;

      return totalMonthA - totalMonthB;
    }
  });
};

export const filterTodosByNav = (nav: string, todos: Todo[], isComplete: boolean) => {
  switch (nav) {
    case "All Todos":
      return todos;
    case "Completed":
      return todos.filter(todo => todo.completed);
    default:
      if (isComplete) return todos.filter(todo => formatDate(todo) === nav && todo.completed);
      else return todos.filter(todo => formatDate(todo) === nav);
  }
}

export const groupTodosByDate = (todos: Todo[]) => {
  const groupNameAndCount = todos.reduce((currentStore: {[index: string]: number}, todo) => {
    const group = formatDate(todo);
    
    currentStore[group] = (currentStore[group] || 0) + 1;
    
    return currentStore;
  }, {});
  
  return Object.entries(groupNameAndCount);
}

