import React from "react";
import { Link } from "react-router-dom";

export default function Card({ repo }) {
  return (
    <Link to={`/product/${repo.id}`}>
      <div className="card">
        <img src={repo.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{repo.title}</h5>
        </div>
      </div>
    </Link>
  );
}
