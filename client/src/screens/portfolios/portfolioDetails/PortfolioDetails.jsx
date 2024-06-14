import styles from "./PortfolioDetails.module.css";
import { Button } from "antd";
import { useState } from "react";
import SelectCoin from "../../coins/selectCoin/SelectCoin";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCoinToPortfolio } from "../../../redux/slices/portfolioList.slice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPortfolioCoinsStats } from "../../../redux/slices/portfolioList.slice";
import PortfolioCoinsTable from "../../../components/portfolioCoinsTable/PortfolioCoinsTable";

const PortfolioDetails = () => {
  const portfolioId = useParams().id;
  const [selectCoinModal, setSelectCoinModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const portfolio = useSelector((state) =>
    state.portfolioList.portfolioList.find((portfolio) => portfolio._id === portfolioId)
  );

  const portfolioCoinsStats = portfolio?.coinsStats;

  const dispatch = useDispatch();

  useEffect(() => {
    if (coin) {
      dispatch(addCoinToPortfolio({ coin, portfolioId }));
    }
  }, [coin, dispatch]);

  useEffect(() => {
    if (!portfolioCoinsStats) {
      dispatch(getPortfolioCoinsStats(portfolioId));
    }
  });

  return (
    <div className={styles.portfolioDetails}>
      <div className={styles.portfolioInfoContainer}>
        <h2>{portfolio && portfolio.name}</h2>
        <Button type="primary" onClick={() => setSelectCoinModal(true)}>
          Add Coin
        </Button>
        {selectCoinModal && (
          <SelectCoin
            setCoin={setCoin}
            isModalVisible={selectCoinModal}
            setIsModalVisible={setSelectCoinModal}
          />
        )}
      </div>

      {portfolio && portfolioCoinsStats && <PortfolioCoinsTable portfolio={portfolio} />}
    </div>
  );
};

export default PortfolioDetails;
