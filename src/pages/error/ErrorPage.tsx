import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="h-screen w-screen px-[16px] py-[8px]">
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/">You can go back to home page by clicking here, though!</Link>
    </div>
  );
};

export default ErrorPage;
