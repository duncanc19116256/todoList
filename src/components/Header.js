/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Header.js
 *
 *
 *
 *
 */

import hStyle from "./style/Header.module.css";

function Header() {
  return (
    <div className={hStyle.headerContainer}>
      <div className={hStyle.headerName1} id="header1">
        ☑
      </div>
      <div className={hStyle.headerName2} id="header2">
        To
      </div>
      <div className={hStyle.headerName3} id="header3">
        Do
      </div>
    </div>
  );
}

export default Header;
