import logoImg from '@/assets/images/layout/Logo.png';
import fbIcon from '@/assets/images/layout/icon-fb.png';
import xIcon from '@/assets/images/layout/icon-twitter.png';
import igIcon from '@/assets/images/layout/icon-instagram.png';

export default function TheFooter() {
  return (
    <div className="bg-primary-700">
      <div className="container pt-12 pt-lg-0 px-3 px-lg-0">
        <div className="footer-desktop d-none d-lg-flex flex-column align-items-center text-gray-100">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <a href="#" className="footer-logo d-block my-8">
              <img src={logoImg} alt="logo" />
            </a>
            <ul className="footer-nav navbar-nav flex-row justify-content-end">
              <li className="nav-item me-4">
                <a className="nav-link link-gray-100" href="#">
                  最新消息
                </a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link link-gray-100" href="#">
                  公益方案
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-gray-100" href="#">
                  會員專區
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex w-100 justify-content-between align-items-center  border-top border-primary-500">
          <ul className="footer-icon navbar-nav flex-row justify-content-between py-8">
              <li className="nav-item me-4">
                <a className="nav-link py-2 px-3" href="#">
                  <img src={fbIcon} alt="fb" />
                </a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link py-2 px-3" href="#">
                  <img src={xIcon} alt="x" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link py-2 px-3" href="#">
                  <img src={igIcon} alt="ig" />
                </a>
              </li>
            </ul>
            <div className="footer-copyright text-end fs-8">
              <p>© 2024 幸享屋 All rights reserved.</p>
            </div>
          </div>
        </div>
        <div className="footer-mobile d-flex d-lg-none flex-column align-items-center text-gray-100">
          <div>
            <a href="#" className="footer-logo d-block mb-6">
              <img src={logoImg} alt="logo" />
            </a>
            <ul className="footer-icon navbar-nav flex-row justify-content-between mb-4">
              <li className="nav-item">
                <a className="nav-link py-2 px-3" href="#">
                  <img src={fbIcon} alt="fb" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link py-2 px-3" href="#">
                  <img src={xIcon} alt="x" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link py-2 px-3" href="#">
                  <img src={igIcon} alt="ig" />
                </a>
              </li>
            </ul>
          </div>
          <div className="w-100">
            <ul className="footer-nav navbar-nav flex-row justify-content-center py-4 border-top border-primary-500">
              <li className="nav-item me-4">
                <a className="nav-link link-gray-100" href="#">
                  最新消息
                </a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link link-gray-100" href="#">
                  公益方案
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-gray-100" href="#">
                  會員專區
                </a>
              </li>
            </ul>
            <div className="footer-copyright text-center fs-8 py-4 border-top border-primary-500">
              <p>© 2024 幸享屋 All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
