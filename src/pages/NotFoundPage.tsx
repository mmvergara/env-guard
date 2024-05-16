import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1>404 Not Found</h1>
      <Link to="/">Go to home</Link>
    </>
  );
};

export default NotFoundPage;
