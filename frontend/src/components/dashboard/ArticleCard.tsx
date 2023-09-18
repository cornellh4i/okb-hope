import React from 'react'
import ArticleIcon from '../../assets/article.svg'


const ArticleCard = ({ title, body }: { title: string, body: string }) => {
  return (
    <div className="card w-11/12 bg-[#519aeb] mt-[24px]">
      <div className="card-body justify-center">
        <figure className="object-cover"><ArticleIcon /></figure>
        {/* <ArticleIcon /> */}
        <h2 className="card-title justify-evenly text-[#fffdfd] font-semibold mt-[8px] mb-[8px]">{title}</h2>
        <h2 className='text-[#fffdfd] font-montserrat font-[400] font-xs'>{body}</h2>
      </div>
    </div>
  );
};

export default ArticleCard;

