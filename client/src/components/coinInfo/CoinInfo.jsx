import styles from "./CoinInfo.module.css";

const CoinInfo = ({ coin, size = "small" }) => {
  size = size === "medium" ? "25px" : size === "large" ? "30px" : "15px";
  return (
    <div className={styles.coinInfoContainer} style={{ fontSize: size }}>
      <img src={coin.logo} alt={coin.name} style={{ width: size, height: size }} />
      <h5>{coin.name}</h5>
      <p>{coin.symbol}</p>
    </div>
  );
};

export default CoinInfo;
