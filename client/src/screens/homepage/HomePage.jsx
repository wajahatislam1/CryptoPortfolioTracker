// Importing components
import { Link } from "react-router-dom";
import { Button } from "antd";
import { LineChartOutlined } from "@ant-design/icons";
import styles from "./HomePage.module.css";
import homeImg1 from "/images/homepage/homeImg1.png";
import homeImg2 from "/images/homepage/homeImg2.png";
import homeImg3 from "/images/homepage/homeImg3.png";

// Extract repeated JSX into a separate component
const FeatureItem = ({ children }) => (
  <div className={styles.featureItem}>
    <LineChartOutlined />
    <p>{children}</p>
  </div>
);

const HomePage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.sectionText}>
            <h2>Track It, Stack It: Your Crypto Companion</h2>
            <p>
              Keep track of your profits, losses and portfolio valuation <br /> with our easy to use
              platform.
            </p>
            <Button type="primary">
              <Link to={"portfolios"}>Manage Your Assets Now</Link>
            </Button>
          </div>
          <div className={styles.imgFirstContainer}>
            <img src={homeImg1} alt="homeImg1" className={styles.sectionImg} />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.imgLastContainer}>
            <img src={homeImg2} alt="homeImg2" className={styles.sectionImg} />
          </div>
          <div className={styles.sectionText}>
            <h2>Track your crypto earnings like a pro.</h2>
            <FeatureItem>Track your holdings and P&L for each coin</FeatureItem>
            <FeatureItem>Monitor performance of multiple portfolios</FeatureItem>
            <FeatureItem>Keep track of transactions of each coin</FeatureItem>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionText}>
            <h2>Your portfolios, your way</h2>
            <FeatureItem>Unlimited Portfolios - Create as many as you need.</FeatureItem>
            <FeatureItem>
              Personalization - Organize by long term, mid term or short term
            </FeatureItem>
            <FeatureItem>
              Secure and private - Your data is never shared with third parties.
            </FeatureItem>
          </div>
          <div className={styles.imgFirstContainer}>
            <img src={homeImg3} alt="homeImg3" className={styles.sectionImg} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
