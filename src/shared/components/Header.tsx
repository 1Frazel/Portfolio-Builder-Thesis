import { Link } from "react-router";

const Header = () => {
  const listHeader = [
    {
      id: "home",
      title: "Home",
      path: "/",
    },
    {
      id: "creation",
      title: "Creation",
      path: "creation",
    },
  ];

  return (
    <div className="px-[64px] py-[32px] ">
      <div className="flex items-center gap-[16px]">
        {listHeader.map((header) => {
          return (
            <Link key={header.id} to={header.path}>
              {header.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
