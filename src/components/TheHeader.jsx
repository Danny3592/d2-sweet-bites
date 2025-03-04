import logoImg from '../assets/images/layout/Logo.png';
import smallLogoImg from '../assets/images/layout/Logo-sm.png';
import smallBrownLogoImg from '../assets/images/layout/Logo-sm-brown.png';
import menuBtn from '../assets/images/layout/Menu-Button.png';
import userBtn from '../assets/images/layout/user-circle.png';
import userBtnBlack from '../assets/images/layout/user-circle-black.png';
import cartBtn from '../assets/images/layout/shopping-cart.png';

import { useEffect, useRef, useState } from 'react';
import { Offcanvas } from 'bootstrap';
import { useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartList } from '../slice/cartSlice';

export default function TheHeader() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isHome = location.pathname === '/'; // 判斷是否為首頁
  const [backgroundColor, setBackgroundColor] = useState(
    isHome ? 'transparent' : '#000000A8'
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBackgroundColor('#000000A8');
      } else {
        setBackgroundColor(isHome ? 'transparent' : '#000000A8');
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const headerOffcanvasRef = useRef(null);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  useEffect(() => {
    new Offcanvas(headerOffcanvasRef.current);
  }, []);

  const openOffcanvas = () => {
    const offcanvasInstance = Offcanvas.getInstance(headerOffcanvasRef.current);
    offcanvasInstance.show();
    setIsOffcanvasOpen(true);
  };

  const closeOffcanvas = () => {
    const offcanvasInstance = Offcanvas.getInstance(headerOffcanvasRef.current);
    offcanvasInstance.hide();
    setIsOffcanvasOpen(false);
  };

  const handleNavLinkClick = () => {
    if (isOffcanvasOpen) closeOffcanvas();
  };

  //取得登入狀態與資料
  const { isLogin, userInfo } = useSelector((state) => state.auth);
  const carts = useSelector((state) => state.cart.carts);
  const [cartCount, setCartCount] = useState(0);
  //取得購物車資料
  useEffect(() => {
    if (userInfo) {
      dispatch(getCartList(userInfo.id));
    } else {
      setCartCount(0);
    }
  }, [userInfo]);

  useEffect(() => {
    setCartCount(carts.length); // 只在 cart 長度變化時更新
  }, [carts]);

  return (
    <nav
      className={`navbar header-nav ${
        isHome ? 'fixed-top' : 'sticky-top'
      } navbar-expand-lg py-lg-4 py-3`}
      style={{ backgroundColor: backgroundColor }}
      id="navbar"
    >
      <div className="container p-fixed">
        <NavLink className="navbar-brand" to="/">
          <picture>
            <source srcSet={logoImg} media="(min-width: 796px)" />
            <img src={smallLogoImg} />
          </picture>
        </NavLink>
        <div className="d-flex align-items-center">
          {isLogin && userInfo ? (
            <NavLink to="/user/profile" className="d-lg-none py-2 px-3">
              <img
                src={userInfo.imageUrl || userBtn}
                className="rounded-circle object-fit-cover"
                style={{ width: 32, height: 32 }}
                alt="user-button"
              />
            </NavLink>
          ) : (
            <NavLink to="/login" className="d-lg-none py-2 px-3">
              <img src={userBtn} alt="user-button" />
            </NavLink>
          )}
          <NavLink to="/cart" className="position-relative d-lg-none py-2 px-3">
            <img src={cartBtn} alt="cart-button" />
            <span
              className="position-absolute badge text-bg-danger rounded-circle"
              style={{
                bottom: '24px',
                left: '24px',
              }}
            >
              {cartCount < 1 ? '' : cartCount}
            </span>
          </NavLink>
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
            <NavLink
              onClick={handleNavLinkClick}
              className="navbar-brand"
              to="/"
            >
              <img src={smallBrownLogoImg} alt="logo" />
            </NavLink>
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
                  <NavLink
                    onClick={handleNavLinkClick}
                    className="nav-link"
                    to="/product-list"
                  >
                    甜點專區
                  </NavLink>
                </li>
                <li className="nav-item mb-10 mb-lg-0 me-lg-10">
                  <NavLink
                    onClick={handleNavLinkClick}
                    className="nav-link"
                    to="/news-list"
                  >
                    最新消息
                  </NavLink>
                </li>
                <li className="nav-item mb-10 mb-lg-0">
                  <NavLink
                    onClick={handleNavLinkClick}
                    className="nav-link"
                    to="/charity"
                  >
                    公益方案
                  </NavLink>
                </li>
                <li className="nav-item d-lg-none">
                  <NavLink
                    onClick={handleNavLinkClick}
                    className="nav-link"
                    to="/user"
                  >
                    會員專區
                  </NavLink>
                </li>
              </ul>
              <div className="d-flex align-items-center nav-icons">
                {isLogin && userInfo ? (
                  <NavLink
                    to="/user/profile"
                    className={`${
                      isOffcanvasOpen ? 'd-none' : ''
                    } member-link d-flex align-items-center mx-auto py-lg-2 py-6 px-lg-3 ms-lg-0 me-lg-6`}
                  >
                    <img
                      src={userInfo.imageUrl || userBtn}
                      className="d-none d-lg-block me-2 rounded-circle object-fit-cover"
                      alt="user-avatar"
                      style={{ width: 32, height: 32 }}
                    />
                    <img
                      src={userInfo.imageUrl || userBtnBlack}
                      className="d-block d-lg-none me-2 rounded-circle object-fit-cover"
                      alt="user-avatar"
                      style={{ width: 32, height: 32 }}
                    />
                    <p>{userInfo.userName}</p>
                  </NavLink>
                ) : (
                  <NavLink
                    onClick={handleNavLinkClick}
                    to="/login"
                    className="member-link d-flex align-items-center mx-auto py-lg-2 py-6 px-lg-3 ms-lg-0 me-lg-6"
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
                  </NavLink>
                )}
                <NavLink
                  to="/cart"
                  className="d-none position-relative d-lg-flex py-2 px-3"
                >
                  <img src={cartBtn} alt="cart-button" />
                  <span
                    className="position-absolute badge text-bg-danger rounded-circle"
                    style={{
                      bottom: '24px',
                      left: '24px',
                    }}
                  >
                    {cartCount < 1 ? '' : cartCount}
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
