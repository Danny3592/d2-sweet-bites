import { Link } from "react-router-dom";
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
export default function NotFound() {
  return (
    <>
      <TheHeader />
      <div className="vh-body bg-primary-50 d-flex flex-column justify-content-center align-items-center">
        <h1 className="mb-3 fs-1">404</h1>
        <p className="fs-3 mb-6">糟糕! 您尋找的頁面不存在</p>
        <Link to="/"
          className="btn btn-primary">
          返回首頁
        </Link>
      </div>
      <TheFooter />
    </>
  )
}
