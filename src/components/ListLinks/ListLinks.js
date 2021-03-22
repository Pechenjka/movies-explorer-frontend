import './ListLinks.css'

const ListLinks = ({links}) => {
  return(
    <ul className="links__list">
    {links.map((item) => {
      return (
        <li className="links__list-container" key={item.id}>
          <a href={item.path} target="blank" rel="noopener" className="links__link" key={item.id}>
            {item.name}
          </a>
        </li>
      );
    })}
  </ul>
  )
}

export default ListLinks;