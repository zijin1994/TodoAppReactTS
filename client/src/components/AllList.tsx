import { NavbarState } from "../types";
interface AllListPropsType {
  allList: Array<[string, number]>;
  onSwitchNav: (e: React.MouseEvent<HTMLDListElement>) => void;
  currentNav: NavbarState
}


const AllList = ({ allList, onSwitchNav, currentNav }: AllListPropsType) => {
  return (
    <>
      {allList.map(([group, count], idx) => (
      <dl data-title={group} 
          data-total={count} 
          key={idx} 
          onClick={onSwitchNav} 
          className={(currentNav.nav === group && !currentNav.completed) ? "active" : ""}>
        <dt><time>{group}</time></dt>
        <dd>{count}</dd>
      </dl>
      ))}
    </>
  );
}

export default AllList;