import React from 'react';
import ArticleCard from './ArticleCard';
import results from '../../../articles.json'; // contains article info 

const ArticleList = () => {
  // Convert the results object into an array
  const articlesArr = Object.values(results);

  return (
    // renders a card containing all of the ArticleCards
    <div className="card w-full bg-base-100">
      <div className="card-body">
        <h1 className="card-title pt-1/15 text-[32px]">Additional Resources</h1>
        <p className="text-[20px] font-[600]">More information can be found at wohohiame.com.</p>
        <div className="grid grid-cols-3 gap-4 items-center pb-1/12 shrink">
          {/* map each JSON object to each individual ArticleCard*/}
          {articlesArr.map(article => (
            <div key={article.id.toString()} className="appointment">
              <ArticleCard title={article.title} body={article.body}></ArticleCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ArticleList;