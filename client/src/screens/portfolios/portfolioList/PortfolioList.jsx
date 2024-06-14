import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./PortfolioList.module.css";
import PortfolioListItem from "../portfolioListItem/portfolioListItem";
import AddPortfolio from "../addPortfolio/AddPortfolio";

const PortfolioList = ({ portfolios }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.portfolioList}>
      <h3>My Portfolios</h3>
      {portfolios.length === 0 && <p>Create a portfolio by clicking on below button</p>}
      {portfolios.map((portfolio) => (
        <div
          key={portfolio._id}
          className={styles.portfolioSelect}
          onClick={() => navigate(`/portfolios/${portfolio._id}`)}
        >
          <PortfolioListItem portfolioId={portfolio._id} />
        </div>
      ))}
      <AddPortfolio />
    </div>
  );
};

export default PortfolioList;
