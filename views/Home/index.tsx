import type { NextPage } from "next";
import Head from "next/head";
import BaseLayout from "../Layouts/BaseLayout";
import Mint from "./Mint";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>P4</title>
      </Head>
      <BaseLayout>
        <Mint />
      </BaseLayout>
    </>
  );
};

export default Home;
