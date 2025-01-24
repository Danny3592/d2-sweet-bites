import { Outlet } from "react-router-dom";
import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  return (
    <>
      <Outlet />
    </>
  )
}

export default App