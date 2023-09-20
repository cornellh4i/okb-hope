import React from 'react';
import ArticleCard from './ArticleCard';
import results from '@/temp_data/articles.json'; // contains article info 

const ArticleList = () => {
  // Convert the results object into an array
  const articlesArr = Object.values(results);

  return (
    // renders a card containing all of the ArticleCards
    <div className="card w-full bg-base-100 rounded-[6.5px] shadow-custom-shadow mt-10">
      <div className="card-body">
        <h1 className="card-title pt-1/15 text-[32px]">Additional Resources</h1>
        {/*not changing color of text to blue from the config so manually added */}
        <p className="text-[#195ba5] text-[20px] font-[600]">More information can be found at <a href="/discover" className='underline'>wohohiame.com</a></p>
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