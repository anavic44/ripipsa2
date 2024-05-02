import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";


export const ProjectCard = ({ titulo, Empresa, imgUrl, id_objeto }) => {
  return (
   
  <Col xs={12} sm={6} md={4}>
     <Link to={`/ar/${id_objeto}`}>
      <div className="proj-imgbx">
      
        <img src={imgUrl} alt={titulo} />
        
        <div className="proj-text">
          <h4>{titulo}</h4>
          <span>{Empresa}</span>
        </div>

      </div>
      </Link>
    </Col>
    
    
  );
};
