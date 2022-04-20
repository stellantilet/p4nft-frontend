import { ReactNode } from "react";
import Footer from "../../sections/Footer";
import Header from "../../sections/Header";

const BaseLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default BaseLayout;
