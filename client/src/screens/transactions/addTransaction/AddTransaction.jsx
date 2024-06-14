import { useState } from "react";
import { Button, Modal, Form } from "antd";
import TransactionForm from "../transactionForm/TransactionForm";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../../redux/slices/transactionList.slice";

const AddTransaction = ({ portfolioId, coinId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onSubmitForm = (transaction) => {
    dispatch(addTransaction({ portfolioId, coinId, ...transaction }));
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title="Add Transaction"
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        destroyOnClose
      >
        <TransactionForm form={form} onFinish={onSubmitForm} />
      </Modal>
      <a
        type="primary"
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          setIsModalVisible(true);
        }}
      >
        Add Transaction
      </a>
    </>
  );
};

export default AddTransaction;
