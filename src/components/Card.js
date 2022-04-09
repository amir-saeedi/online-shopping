import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function Card({ repo }) {
  return (
    <Link to={`/product/${repo.id}`}>
      <div className="card">
        <img src={repo.image} className="card-img-top" alt="..." />
        <div className="card-body flex_column">
          <h5 className="card-title">{repo.title}</h5>
          <div className="price_rate flex_row">
            <h4>{repo.price} $</h4>
            <h4>
              <FaStar color="yellow" fontSize={20} /> {repo.rating.rate}
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );
}
