import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import styles from "./PortfolioCoinsTable.module.css";

import { deleteCoinFromPortfolio } from "../../redux/slices/portfolioList.slice";
import AddTransaction from "../../screens/transactions/addTransaction/AddTransaction";
import CoinInfo from "../coinInfo/CoinInfo";

const AmountAndPercentageColumn = ({ amount, percentage }) => {
  const sign = amount < 0 ? "-" : "+";
  const color = amount < 0 ? "red" : "green";
  let formattedAmount = "";
  let formattedPercentage = "";

  if (amount) {
    formattedAmount = `${sign} ${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount))}`;
  }

  if (percentage != undefined) {
    formattedPercentage = `${percentage.toFixed(3)}%`;
  }

  return (
    <>
      {amount && percentage && (
        <p style={{ color: color }}>
          {formattedAmount}
          <br />
          {formattedPercentage}
        </p>
      )}
    </>
  );
};

const PortfolioCoinsTable = ({ portfolio }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableData = portfolio?.coins?.map((coin) => ({
    key: coin._id,
    _id: coin._id,
    logo: coin.logo,
    name: coin.name,
    symbol: coin.symbol,
    stats: portfolio.coinsStats.find((coinStats) => coinStats.coinId === coin._id)?.coinStats || {},
  }));

  const formatCurrency = (value) => {
    return (
      value &&
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)
    );
  };

  return (
    <>
      <Table dataSource={tableData} pagination={false}>
        <Table.Column
          title="Coin"
          dataIndex="name"
          key="name"
          render={(text, record) => <CoinInfo coin={record} size="small" />}
          sorter={(a, b) => a.name.localeCompare(b.name)}
        />

        <Table.Column
          title="Price"
          dataIndex="stats"
          key="price"
          render={(text, record) => formatCurrency(record.stats?.currentPrice)}
          sorter={(a, b) => a.stats?.currentPrice - b.stats?.currentPrice}
        />

        <Table.Column
          title="Average Buy Price"
          dataIndex="stats"
          key="averageBuyPrice"
          render={(text, record) =>
            formatCurrency(record.stats?.positionAveragePrice?.toFixed(3)) || ""
          }
          sorter={(a, b) => a.stats?.positionAveragePrice - b.stats?.positionAveragePrice}
        />

        <Table.Column
          title="Holdings"
          dataIndex="stats"
          key="value"
          render={(text, record) => {
            return (
              <>
                <p>{formatCurrency(record.stats?.totalPositionValue?.toFixed(3)) || ""} </p>{" "}
                <p>
                  {record.stats?.amountOfCoins || ""} {record.stats?.amountOfCoins && record.name}
                </p>
              </>
            );
          }}
          sorter={(a, b) => a.stats?.totalPositionValue - b.stats?.totalPositionValue}
        />

        <Table.Column
          title="Realized PNL"
          dataIndex="stats"
          key="realizedPNL"
          flex={1}
          render={(text, record) => (
            <AmountAndPercentageColumn
              amount={record.stats?.realizedPNL}
              percentage={record.stats?.realizedPNLPercentage}
            />
          )}
          sorter={(a, b) => a.stats?.realizedPNL - b.stats?.realizedPNL}
        />

        <Table.Column
          title="Unrealized PNL"
          dataIndex="stats"
          key="unrealizedPNL"
          flex={1}
          render={(text, record) => (
            <AmountAndPercentageColumn
              amount={record.stats?.unrealizedPNL}
              percentage={record.stats?.unrealizedPNLPercentage}
            />
          )}
          sorter={(a, b) => a.stats?.unrealizedPNL - b.stats?.unrealizedPNL}
        />

        <Table.Column
          title="Total PNL"
          dataIndex="stats"
          key="totalPNL"
          flex={1}
          render={(text, record) => (
            <AmountAndPercentageColumn
              amount={record.stats?.unrealizedPNL || 0 + record.stats?.realizedPNL || 0}
              percentage={
                record.stats?.unrealizedPNLPercentage ||
                0 + record.stats?.realizedPNLPercentage ||
                0
              }
            />
          )}
          sorter={(a, b) =>
            a.stats?.unrealizedPNL +
            a.stats?.realizedPNL -
            b.stats?.unrealizedPNL +
            b.stats?.realizedPNL
          }
        />

        <Table.Column
          title="Actions"
          key="actions"
          flex={1}
          render={(text, record) => (
            <div className={styles.actionsDiv}>
              <a
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(
                    deleteCoinFromPortfolio({ coinId: record._id, portfolioId: portfolio._id })
                  );
                }}
              >
                {" "}
                Delete Coin{" "}
              </a>

              <a
                type="primary"
                onClick={() => navigate(`/portfolios/${portfolio._id}/coins/${record._id}`)}
              >
                {" "}
                See Transactions{" "}
              </a>

              <AddTransaction portfolioId={portfolio._id} coinId={record._id} />
            </div>
          )}
        />
      </Table>
    </>
  );
};

export default PortfolioCoinsTable;
