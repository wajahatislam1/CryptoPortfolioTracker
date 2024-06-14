import { Table, Space, Avatar } from "antd";
import moment from "moment";
import styles from "./TransactionTable.module.css";

const TransactionTable = ({ transactionList, coinSymbol }) => {
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <>
          <Avatar style={{ backgroundColor: type === "buy" ? "green" : "red" }}>
            {type === "buy" ? "B" : "S"}
          </Avatar>
          <span style={{ marginLeft: "10px" }}>{type === "buy" ? "Buy" : "Sell"}</span>
        </>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amountOfCoins",
      key: "amountOfCoins",
      render: (text, record) => {
        const dollarAmount = text * record.pricePerCoin;
        const sign = record.type === "sell" ? "-" : "+";
        const color = record.type === "sell" ? "red" : "green";
        return (
          <>
            <p style={{ color: color }}>
              {`${sign} $${dollarAmount.toFixed(2)}`}
              <br />
              {`${sign} ${text} ${coinSymbol}`}
            </p>
          </>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "pricePerCoin",
      key: "pricePerCoin",

      render: (text) => <p>{"$" + text}</p>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      defaultSortOrder: "descend",
      render: (date) => moment(date).format("MMMM Do YYYY, h:mm a"),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = transactionList.map((transaction) => ({
    key: transaction._id,
    coinId: transaction.coinId,
    amountOfCoins: transaction.amountOfCoins,
    pricePerCoin: transaction.pricePerCoin,
    date: transaction.date,
    type: transaction.type,
  }));

  return (
    <Table className={styles.transactionTable} columns={columns} dataSource={data} size="small" />
  );
};

export default TransactionTable;
