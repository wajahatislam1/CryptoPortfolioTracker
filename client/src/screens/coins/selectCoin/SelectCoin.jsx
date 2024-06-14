import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Input } from "antd";
import { fetchCoinList } from "../../../redux/slices/coinList.slice";
import CoinInfo from "../../../components/coinInfo/CoinInfo";
import styles from "./SelectCoin.module.css";

const SelectCoin = ({ setCoin, isModalVisible, setIsModalVisible }) => {
  const { coinList, pending } = useSelector((state) => state.coinList);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  //Filter the coins based on user's search term.
  const filteredList = coinList.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  //Fetch the coins from backend if they are not already fetched
  useEffect(() => {
    if (coinList.length === 0) {
      dispatch(fetchCoinList());
    }
  }, [dispatch, coinList]);

  return (
    <Modal
      title="Select Coin"
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <Input placeholder="Search Coin" onChange={(e) => setSearchTerm(e.target.value)} />

      {pending === true && <p>Fetching Coins</p>}
      {coinList.length !== 0 && (
        <div className={styles.searchResults}>
          {filteredList.map((coin) => (
            <div
              className={styles.resultItem}
              key={coin._id}
              onClick={() => {
                setCoin(coin), setIsModalVisible(false);
              }}
            >
              <CoinInfo coin={coin} />
            </div>
          ))}

          {filteredList.length === 0 && <p>No coins matching that search term</p>}
        </div>
      )}
    </Modal>
  );
};

export default SelectCoin;
