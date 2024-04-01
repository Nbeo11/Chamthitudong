import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';

import { ConfigContext } from '../../../contexts/ConfigContext';
import * as actionType from '../../../store/actions';

const NavBar = () => {
  const configContext = useContext(ConfigContext);
  const { collapseMenu, headerFixedLayout, layout } = configContext.state;
  const { dispatch } = configContext;

  let headerClass = ['navbar', 'pcoded-header-student', 'navbar-expand-lg'];
  if (headerFixedLayout && layout === 'vertical') {
    headerClass = [...headerClass, 'headerpos-fixed'];
  }

  let toggleClass = ['mobile-menu'];
  if (collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  const navToggleHandler = () => {
    dispatch({ type: actionType.COLLAPSE_MENU });
  };


  let navBar = (
    <React.Fragment>
      <div className="m-header">
        <Link to="#" className={toggleClass.join(' ')} id="mobile-collapse" onClick={navToggleHandler}>
          <span />
        </Link>
        <Link to="#" className="b-brand">
          <div className="b-bg">
            <img src={logo} alt="Logo" />
          </div>
          <span className="b-title">Hệ thống chấm thi</span>
        </Link>
      </div>

    </React.Fragment>
  );

  return (
    <React.Fragment>
      <header className={headerClass.join(' ')}>{navBar}</header>
    </React.Fragment>
  );
};

export default NavBar;
