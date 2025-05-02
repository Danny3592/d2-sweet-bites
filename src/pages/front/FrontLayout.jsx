import { Outlet } from "react-router-dom";
import TheHeader from '@/components/TheHeader';
import TheFooter from '@/components/TheFooter';
export default function FrontLayout() {
  return (
    <>
      <TheHeader />
      <Outlet />
      <TheFooter />
    </>
  )
}
