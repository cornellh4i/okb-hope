import React from 'react'
import ArticleIcon from '../../assets/article.svg'


const ArticleCard = ({ title, body }: { title: string, body: string }) => {
  return (
    <div className="card w-11/12 bg-base-100 shadow-xl">
      <div className="card-body justify-center">
        <ArticleIcon />
        <h2 className="card-title justify-evenly">{title}</h2>
        <h2>{body}</h2>
      </div>
    </div>
  );
};

export default ArticleCard;

