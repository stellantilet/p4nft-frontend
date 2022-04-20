import classNames from "classnames";
import Button from "../Buttons/Button";

const NFTCard = ({ data }: { data: any }) => {
  const handleBurn = () => {};
  return (
    <div className="border p-4 rounded">
      <div className="aspect-square border bg-black rounded"></div>
      <div className="mt-2">
        <div className="text-xl font-bold">
          <span>NFT - </span>
          <span>{data.id}</span>
        </div>
        <div className="mt-2">
          <span>Rarity</span>
          <span> {data.rarity || "__"}</span>
        </div>
      </div>
      <div className="mt-2">
        <Button onClick={handleBurn}>Burn</Button>
      </div>
    </div>
  );
};

export default NFTCard;
