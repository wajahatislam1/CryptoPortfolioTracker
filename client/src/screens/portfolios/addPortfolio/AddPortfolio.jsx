import { Modal, Button, Form } from "antd";
import { useState } from "react";
import PortfolioForm from "../portfolioForm/PortfolioForm";

import { useDispatch } from "react-redux";
import { addPortfolio } from "../../../redux/slices/portfolioList.slice";

const AddPortfolio = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onSubmitForm = (portfolio) => {
    dispatch(addPortfolio(portfolio));
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        + Create Portfolio
      </Button>
      <Modal
        title="Add Portfolio"
        open={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
        destroyOnClose
      >
        <PortfolioForm form={form} onFinish={onSubmitForm} setIsModalVisible={setIsModalVisible} />
      </Modal>
    </>
  );
};

export default AddPortfolio;
