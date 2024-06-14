// PortfolioListItem.jsx
import React from "react";
import styles from "./PortfolioListItem.module.css";
import { Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Modal, Form } from "antd";
import { useState } from "react";
import PortfolioForm from "../portfolioForm/PortfolioForm";

import { useDispatch } from "react-redux";
import { editPortfolio, deletePortfolio } from "../../../redux/slices/portfolioList.slice";
import { useEffect } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import PortfolioInfo from "../../../components/portfolioInfo/PortfolioInfo";

const PortfolioListItem = ({ portfolioId }) => {
  const portfolio = useSelector((state) =>
    state.portfolioList.portfolioList.find((portfolio) => portfolio._id === portfolioId)
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isModalVisible) {
      form.setFieldsValue(portfolio);
    }
  }, [isModalVisible, form, portfolio]);

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onSubmitForm = (editedPortfolio) => {
    dispatch(editPortfolio({ portfolioId: portfolio._id, updatedPortfolio: editedPortfolio }));
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this portfolio?",
      icon: <ExclamationCircleFilled />,
      content: "Deleting the portfolio will remove all the data associated with it.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      destroyOnClose: true,

      onOk() {
        dispatch(deletePortfolio(portfolio._id));
      },
    });
  };

  return (
    <>
      <Modal
        title="Edit Portfolio"
        open={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
        destroyOnClose
      >
        <PortfolioForm
          initialValues={portfolio}
          form={form}
          onFinish={onSubmitForm}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>

      <div className={styles.portfolioListItem}>
        {portfolio && <PortfolioInfo portfolio={portfolio} />}
        <div className={styles.actions}>
          <EditOutlined onClick={() => setIsModalVisible(true)} />

          <DeleteOutlined onClick={handleDelete} />
        </div>
      </div>
    </>
  );
};

export default PortfolioListItem;
