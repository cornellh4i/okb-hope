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
        <h1 className="card-title pt-1/15 text-[32px] font-montserrat">Additional Resources</h1>
        {/*not changing color of text to blue from the config so manually added */}
        <p className="text-[#195ba5] text-[20px] font-[600] font-montserrat">More information can be found at <a href="https://www.wohohiame.org/" className='underline'>wohohiame.com</a>.</p>
        <div className="grid lg:grid-cols-3 h-auto gap-6 pb-1/12 mt-[24px] shrink items-center">
          {/* map each JSON object to each individual ArticleCard*/}
          {articlesArr.map(article => (
            <div key={article.id.toString()} className="appointment h-full justify-center items-center content-center">
              <ArticleCard id={article.id} title={article.title} body={article.body} href={article.href}></ArticleCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ArticleList;
