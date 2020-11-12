import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound() {
  return (
    <div className='not-found-page-container'>
      <div className='not-found-page-content'>
        <h2 className='not-found-title'>Sorry</h2>
        <h1 className='not-found-404'>404</h1>
        <h3 className='not-found-info'>Pokemon Not Found</h3>
        <Link to='/'>
          <button className='btn'>Go Back Home</button>
        </Link>
      </div>
    </div>
  );
}
