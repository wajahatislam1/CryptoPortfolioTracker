import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import App from "../App";
import HomePage from "../screens/homepage/HomePage";
import UserAuth from "../screens/users/userAuth/UserAuth";
import GoogleAuth from "../screens/users/googleAuth/GoogleAuth";
import PortfolioPage from "../screens/portfolios/portfolioPage/PortfolioPage";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
import PortfolioDetails from "../screens/portfolios/portfolioDetails/PortfolioDetails";
import CoinDetails from "../screens/coins/coinDetails/CoinDetails";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} />
      <Route path="users/auth/google" element={<GoogleAuth />} />
      <Route path="portfolios" element={<ProtectedRoute children={<PortfolioPage />} />}>
        <Route path=":id" element={<ProtectedRoute children={<PortfolioDetails />} />} />
        <Route
          path=":portfolioId/coins/:coinId"
          element={<ProtectedRoute children={<CoinDetails />} />}
        />
      </Route>
    </Route>,

    <Route path="users/auth" element={<UserAuth />} />,
  ])
);

export default router;
