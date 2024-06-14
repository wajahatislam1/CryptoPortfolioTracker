import React, { useState } from "react";
import styles from "./PortfolioForm.module.css";
import { Button, Form, ColorPicker, Input, Switch, Avatar } from "antd";

const PortfolioForm = ({ initialValues = {}, form, onFinish }) => {
  const avatarColors = [
    "#17C785",
    "#8A3FFC",
    "#45EFE5",
    "#22DDF6",
    "#F6B980",
    "#FF785F",
    "#EA3943",
    "#808A9E",
  ];

  const emojis = [
    "🚀",
    "🔥",
    "❤️",
    "👻",
    "⚡",
    "🔑",
    "⚒️",
    "🔶",
    "🔷",
    "💎",
    "💰",
    "🏦",
    "💵",
    "🔔",
    "🦄",
    "🦊",
    "🐶",
    "🐰",
    "🐯",
    "🐻",
    "🐮",
    "🍕",
    "🍔",
    "💊",
    "👑",
    "🌈",
    "🤖",
    "🌕",
  ];

  const [includeInTotal, setIncludeInTotal] = useState(initialValues.includeInTotal || false);
  const [avatar, setAvatar] = useState(initialValues.avatar || emojis[0]);
  const [avatarColor, setAvatarColor] = useState(initialValues.avatarColor || avatarColors[0]);

  const handleFormSubmit = (values) => {
    onFinish({ ...values, avatar, avatarColor, includeInTotal });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormSubmit}
      className={styles.formContainer}
    >
      <Avatar style={{ backgroundColor: avatarColor }} size={64}>
        <span style={{ fontSize: "1.5em" }}>{avatar}</span>
      </Avatar>

      <Form.Item label="Avatar Background" name="avatarColor">
        <div className={styles.colorContainer}>
          {avatarColors.map((color, index) => (
            <Avatar
              key={index}
              style={{ backgroundColor: color }}
              size={32}
              onClick={() => setAvatarColor(color)}
            />
          ))}
        </div>
      </Form.Item>

      <Form.Item label="Portfolio Avatar" name="avatar">
        <div className={styles.avatarContainer}>
          {emojis.map((emoji, index) => (
            <h3 key={index} onClick={() => setAvatar(emoji)} className={styles.avatarItem}>
              {emoji}
            </h3>
          ))}
        </div>
      </Form.Item>

      <Form.Item
        label="Portfolio Name"
        name="name"
        initialValue={initialValues.name}
        rules={[
          {
            required: true,
            message: "Please input Portoflio Name!",
          },
          {
            max: 24,
            message: "Portfolio name cannot be longer than 24 characters",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Count as my portfolio total" name="includeInTotal">
        <Switch onChange={(checked) => setIncludeInTotal(checked)} />
      </Form.Item>
    </Form>
  );
};

export default PortfolioForm;
