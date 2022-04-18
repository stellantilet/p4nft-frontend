import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../Layouts/Footer";
import Header from "../Layouts/Header";
import Mint from "./Mint";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>P4</title>
      </Head>
      <Header />
      <div>
        <Mint />
      </div>
      <Footer />
    </>
  );
};

export default Home;
