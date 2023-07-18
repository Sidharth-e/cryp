
import {AiOutlineRight} from "react-icons/ai";
export default function heading({name}){
    return(
        <div className="head-title">
          <div className="left">
            <h1>{name}</h1>
            <ul className="breadcrumb">
              <li>
                <a href="/#">Dashboard</a>
              </li>
              <li><i className='bx' ><AiOutlineRight/></i></li>
              <li>
                <a className="active" href="/#">{name}</a>
              </li>
            </ul>
          </div>
          <a href="/#" className="btn-download">
            <i className='bx bxs-cloud-download' ></i>
            <span className="text">Download PDF</span>
          </a>
        </div>
    );
}