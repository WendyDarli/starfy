import { Link } from "react-router";
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="errorPageContainer">
      <h1>Oh no, this page doesn't exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;
