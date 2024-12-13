import { NavbarState } from "../types";


const Header = ({ currentNav, count }: { currentNav: NavbarState; count: number}) => {
  return (
  <header>
   <label htmlFor="sidebar_toggle">
     <img src="images/hamburger.png" alt="Toggle Sidebar" />
   </label>
   <dl>
     <dt><time>{currentNav.nav}</time></dt>
     <dd>{count}</dd>
   </dl>   
  </header>
  );
}



export default Header;