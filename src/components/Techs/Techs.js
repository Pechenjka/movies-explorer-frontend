import "./Techs.css";

const Techs = () => {
  const stackTechs = ["HTML", "CSS", "JS", "React", "Git", "Express", "mongoDB"];
  return (
    <div className="content_techs">
      <div className="techs__header">
        <p className="techs__header_text">Технологии</p>
      </div>
      <div className="techs__body">
        <h3 className="techs__body-header">7 технологий</h3>
        <p className="techs__body-text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
      </div>
      <ul className="techs__stack">
        {stackTechs.map((item) => (
          <li className="techs__stack_container">
            <p className='techs__stack_item'>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Techs;
