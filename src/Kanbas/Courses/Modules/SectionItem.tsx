import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SectionItem as SectionItemType } from "../../types";

interface SectionItemProps {
  item: SectionItemType;
}

const SectionItem = ({ item }: SectionItemProps) => {
  return (
    <li className="module-section-item" key={item._id}>
      <div>
        <FaEllipsisV className="ms-2 ellipsis-v ellipsis-left"></FaEllipsisV>
      </div>
      <div className="module-item-text">
        <Link to={item.url} className="module-section-item-link">
          {item.title}
        </Link>
      </div>
      <div className="module-list-buttons modules-buttons-right">
        <button type="button">
          <FaCheckCircle className="text-success" />
        </button>
        <button type="button">
          <FaEllipsisV className="ms-2 ellipsis-v"></FaEllipsisV>
        </button>
      </div>
    </li>
  );
};

export default SectionItem;
