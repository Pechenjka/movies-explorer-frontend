import "./HeaderComponent.css";

const HeaderComponent = ({title}) => {
  return (
    <header className="headerComponent">
      <p className="headerComponent__title">{title}</p>
    </header>
  );
};

export default HeaderComponent;
