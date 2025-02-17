import logoImg from '../assets/images/layout/Logo.png';
import smallLogoImg from '../assets/images/layout/Logo-sm.png';
import smallBrownLogoImg from '../assets/images/layout/Logo-sm-brown.png';
import menuBtn from '../assets/images/layout/Menu-Button.png';
import userBtn from '../assets/images/layout/user-circle.png';
import userBtnBlack from '../assets/images/layout/user-circle-black.png';
import cartBtn from '../assets/images/layout/shopping-cart.png';

import { useEffect, useRef, useState } from 'react';
import { Offcanvas } from 'bootstrap';

export default function TheHeader() {
  const [backgroundColor, setBackgroundColor] = useState('transparent');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setBackgroundColor('#000000A8');
      } else {
        setBackgroundColor('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerOffcanvasRef = useRef(null);

  useEffect(() => {
    new Offcanvas(headerOffcanvasRef.current);
  }, []);

  const openOffcanvas = () => {
    const offcanvasInstance = Offcanvas.getInstance(headerOffcanvasRef.current);
    offcanvasInstance.show();
  };

  const closeOffcanvas = () => {
    const offcanvasInstance = Offcanvas.getInstance(headerOffcanvasRef.current);
    offcanvasInstance.hide();
  };

  return (
    <nav
      className="navbar header-nav sticky-top navbar-expand-lg py-lg-4 py-3"
      style={{ backgroundColor: backgroundColor }}
      id="navbar"
    >
      <div className="container p-fixed">
        <a className="navbar-brand" href="#">
          <picture>
            <source srcSet={logoImg} media="(min-width: 796px)" />
            <img src={smallLogoImg} />
          </picture>
        </a>
        <div className="d-flex align-items-center">
          <a href="#" className="d-lg-none py-2 px-3">
            <img src={userBtn} alt="user-button" />
          </a>
          <a href="#" className="d-lg-none py-2 px-3">
            <img src={cartBtn} alt="cart-button" />
          </a>
          <button
            onClick={openOffcanvas}
            className="navbar-toggler border-0"
            type="button"
          >
            <img src={menuBtn} alt="menu-button" />
          </button>
        </div>
        <div
          ref={headerOffcanvasRef}
          className="offcanvas offcanvas-top"
          tabIndex="-1"
          id="offcanvasNavbar"
        >
          <div className="offcanvas-header border-bottom border-1 border-gray-400 p-3">
            <a className="navbar-brand" href="#">
              <img src={smallBrownLogoImg} alt="logo" />
            </a>
            <button
              type="button"
              className="ms-auto btn-close py-2 px-8 text-black"
              onClick={closeOffcanvas}
            ></button>
          </div>
          <div className="offcanvas-body align-items-center justify-content-end p-0">
            <div className="d-flex flex-column flex-lg-row h-100">
              <ul className="navbar-nav align-items-center mt-12 mt-lg-0 ms-lg-auto me-lg-12 mb-auto mb-lg-0">
                <li className="nav-item mb-10 mb-lg-0 me-lg-10">
                  <a className="nav-link" href="#">
                    甜點專區
                  </a>
                </li>
                <li className="nav-item mb-10 mb-lg-0 me-lg-10">
                  <a className="nav-link" href="#">
                    最新消息
                  </a>
                </li>
                <li className="nav-item mb-10 mb-lg-0">
                  <a className="nav-link" href="#">
                    公益方案
                  </a>
                </li>
                <li className="nav-item d-lg-none">
                  <a className="nav-link" href="#">
                    會員專區
                  </a>
                </li>
              </ul>
              <div className="d-flex align-items-center nav-icons">
                <a
                  href="#"
                  className="d-flex align-items-center mx-auto py-lg-2 py-6 px-lg-3 ms-lg-0 me-lg-6"
                >
                  <img
                    src={userBtn}
                    className="d-none d-lg-block me-2"
                    alt="user-button"
                  />
                  <img
                    src={userBtnBlack}
                    className="d-block d-lg-none me-2"
                    alt="user-button"
                  />
                  <p>登入會員</p>
                </a>
                <a href="#" className="d-none d-lg-flex py-2 px-3">
                  <img src={cartBtn} alt="cart-button" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
