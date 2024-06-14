import { Form, Input, TimePicker, DatePicker, Select, InputNumber } from "antd";
import moment from "moment";
import { useState } from "react";

const TransactionForm = ({ transaction, onFinish, form }) => {
  const [transactionType, setTransactionType] = useState(transaction?.type || "buy");
  const [transactionDate, setTransactionDate] = useState(transaction?.date || moment());
  const [transactionTime, setTransactionTime] = useState(transaction?.time || moment());
  const [amountOfCoins, setAmountOfCoins] = useState(transaction?.coinAmount || 0);
  const [pricePerCoin, setPricePerCoin] = useState(transaction?.coinPirce || 0);

  const handleSubmit = () => {
    const dateTime = moment(
      `${transactionDate.format("YYYY-MM-DD")} ${transactionTime.format("HH:mm")}`
    );
    const jsDate = dateTime.toDate();
    onFinish({ type: transactionType, date: jsDate, amountOfCoins, pricePerCoin });
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item label="Transaction Type">
        <Select value={transactionType} onChange={(value) => setTransactionType(value)}>
          <Select.Option value="buy">Buy</Select.Option>
          <Select.Option value="sell">Sell</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Transaction Date"
        initialValue={transactionDate}
        name="transactionDate"
        rules={[{ required: true, message: "Please input the transaction time!" }]}
      >
        <DatePicker
          style={{ width: "100%" }}
          value={transactionDate}
          onChange={(value) => setTransactionDate(value)}
        />
      </Form.Item>
      <Form.Item
        label="Transaction Time"
        name="transactionTime"
        initialValue={transactionTime}
        rules={[{ required: true, message: "Please input the transaction time!" }]}
      >
        <TimePicker
          style={{ width: "100%" }}
          value={transactionTime}
          onChange={(value) => setTransactionTime(value)}
          format="HH:mm"
        />
      </Form.Item>
      <Form.Item
        label="Amount of Coins"
        name="amountOfCoins"
        initialValue={amountOfCoins}
        rules={[
          {
            type: "number",
            min: Number.MIN_VALUE,
            message: `Amount of coins should be greater than 0`,
          },
          {
            required: true,
            message: "Please input the amount of coins",
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          value={amountOfCoins}
          onChange={(value) => setAmountOfCoins(value)}
        />
      </Form.Item>

      <Form.Item
        label="Price per Coin"
        name="pricePerCoin"
        initialValue={pricePerCoin}
        rules={[
          {
            type: "number",
            min: Number.MIN_VALUE,
            message: `Amount of coins should be greater than 0`,
          },
          {
            required: true,
            message: "Please input the amount of coins",
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          type="number"
          value={pricePerCoin}
          onChange={(value) => setPricePerCoin(value)}
        />
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;
