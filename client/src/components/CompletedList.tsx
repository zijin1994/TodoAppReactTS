import { NavbarState } from "../types";
interface CompletedListPropsType {
  completedList: Array<[string, number]>;
  onSwitchNav: (e: React.MouseEvent<HTMLDListElement>) => void;
  currentNav: NavbarState
}



const CompletedList = ({ completedList, onSwitchNav, currentNav }: CompletedListPropsType) => {
  return (
    <>
      {completedList.map(([group, count], idx) => (
      <dl data-title={group} 
          data-total={count} 
          key={idx} 
          id={String(idx)} 
          onClick={onSwitchNav} 
          className={(currentNav.nav === group && currentNav.completed) ? "active" : ""}>
        <dt><time>{group}</time></dt>
        <dd>{count}</dd>
      </dl>
      ))}
    </>
  );
}

export default CompletedList;