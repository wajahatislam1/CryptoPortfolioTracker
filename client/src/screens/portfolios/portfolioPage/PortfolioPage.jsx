import PortfolioList from "../portfolioList/PortfolioList";
import styles from "./PortfolioPage.module.css";
import { fetchPortfolioList } from "../../../redux/slices/portfolioList.slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const PortfolioPage = () => {
  const { portfolioList, pending, fetched } = useSelector((state) => state.portfolioList);
  //Select path from the URL
  const path = useLocation().pathname;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchPortfolioList());
    }
  }, [dispatch, portfolioList]);

  useEffect(() => {
    if (
      !pending &&
      portfolioList.length > 0 &&
      (path.endsWith("/portfolios") || path.endsWith("/portfolios/"))
    ) {
      navigate(`/portfolios/${portfolioList[0]._id}`);
    }
  }, [pending, portfolioList]);

  return (
    <div className={styles.portfolioPage}>
      <div className={styles.portfoliosContainer}>
        {pending === true && <p>Fetching Portfolios</p>}
        {<PortfolioList portfolios={portfolioList} />}
      </div>

      <div div={styles.detailsComponent}>
        <Outlet />
      </div>
    </div>
  );
};

export default PortfolioPage;
