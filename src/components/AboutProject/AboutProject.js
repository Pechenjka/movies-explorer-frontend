import "./AboutProject.css";

const AboutProject = () => {
  const aboutProject = [
    {
      header: "Дипломный проект включал 5 этапов",
      paragraph: "Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.",
    },
    {
      header: "На выполнение диплома ушло 5 недель",
      paragraph:
        "У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.",
    },
  ];

  const timeTable = [
    { header: "1 неделя", firstRow: "Back-end" },
    { header: "4 недели", firstRow: "Front-end" },
  ];

  return (
    <div className="content_aboutProject">
      <div className="aboutProject__header">
        <p className="aboutProject__header_text">О проекте</p>
      </div>

      <ul className="aboutProject__list">
        {aboutProject.map((item) => {
          return (
            <li className="aboutProject__list_container">
              <h3 className="aboutProject__list_header">{item.header}</h3>
              <p className="aboutProject__list_paragraph">{item.paragraph}</p>
            </li>
          );
        })}
      </ul>
      <table className="aboutProject__table">
        {timeTable.map((item) => {
          return (
            <tr className="aboutProject__table_container">
              <td className="aboutProject__table_header">{item.header}</td>
              <td className="aboutProject__table_row">{item.firstRow}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default AboutProject;
