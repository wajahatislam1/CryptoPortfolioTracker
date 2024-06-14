import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CoinInfo from "../../../components/coinInfo/CoinInfo";
import { fetchTransactionList } from "../../../redux/slices/transactionList.slice";
import TransactionTable from "../../../components/transactionTable/TransactionTable";
import styles from "./CoinDetails.module.css";

const CoinDetails = () => {
  const { portfolioId, coinId } = useParams();
  const transactionList = useSelector((state) => state.transactionList.transactionList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactionList({ portfolioId, coinId }));
  }, [portfolioId, coinId]);

  const coin = useSelector((state) => {
    const portfolio = state.portfolioList.portfolioList.find(
      (portfolio) => portfolio._id === portfolioId
    );
    return portfolio?.coins?.find((coin) => coin._id === coinId);
  });
  return (
    <div className={styles.coinDetailContainer}>
      {coin && <CoinInfo coin={coin} size={"large"} />}
      <h3>Transactions</h3>
      {coin && <TransactionTable transactionList={transactionList} coinSymbol={coin.symbol} />}
    </div>
  );
};

export default CoinDetails;
