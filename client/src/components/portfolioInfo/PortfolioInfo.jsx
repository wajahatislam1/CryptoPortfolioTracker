import { Avatar } from "antd";
import styles from "./PortfolioInfo.module.css";

const PortfolioInfo = ({portfolio}) => {
  return (
    <>
      <div>
        <Avatar style={{ backgroundColor: portfolio.avatarColor }} size={42}>
          {portfolio.avatar}
        </Avatar>
        <p className={styles.name}>{portfolio.name}</p>
      </div>
    </>
  );
};


export default PortfolioInfo;