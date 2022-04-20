import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import NFTCard from "../../components/NFT.tsx/NFTCard";

import { useAppContext } from "../../context/AppContext";
import { BaseRecord } from "../../services/data/DataTypes";
import BaseLayout from "../Layouts/BaseLayout";

const NFTs: NextPage = () => {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<BaseRecord[]>([]);

  const { dataService } = useAppContext();

  const loadData = async () => {
    console.log("before", page);
    if (loading) return;

    setLoading(true);

    const data = await dataService.getList({
      resource: "items",
      pagination: { pageSize: 12, current: page + 1 },
    });
    setCount(data.total);
    setList([...list, ...data.data]);

    setHasMore(data.total > (page + 1) * 12);
    setPage(page + 1);

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>P4</title>
      </Head>
      <BaseLayout>
        <div className="container mx-auto px-4 py-10">
          <InfiniteScroll
            loadMore={loadData}
            hasMore={hasMore}
            threshold={10}
            loader={<div key={0}>Loading ...</div>}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {list.map((item, index) => (
                <NFTCard key={`${index}`} data={item} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </BaseLayout>
    </>
  );
};

export default NFTs;
