import React, { useEffect, useState } from 'react'
import ArticleIcon from '../../assets/article.svg'
import Image from 'next/image';
import Link from 'next/link';

import Anxiety from "@/assets/anxiety.png";
import Depression from "@/assets/depression.png";
import Relationships from "@/assets/relationships.png";

import GroundingTechniquesImage from "@/assets/grounding_techniques.png";
import HealthyDiet from "@/assets/healthy_diet.png";
import CalmBreathingImage from "@/assets/calm_breathing.png";

import Drugs from "@/assets/drugs.png";
import Addiction from "@/assets/addiction.png";
import Alcohol from "@/assets/alcohol.png";

import BoostMood from "@/assets/boost_mood.png";
import PhysicalExercise from "@/assets/physical_exercise.png";
import Sleep from "@/assets/sleep.png";

import SelfIdentity from "@/assets/self_identity.png";
import AbusiveRelationships from "@/assets/abusive_relationships.png";


const ArticleCard = ({ id, title, body, href }: { id, title: string, body: string, href: string }) => {
  const [image, setImage] = useState(GroundingTechniquesImage);

  useEffect(() => {
    if (id == "art1") {
      setImage(Anxiety);
    } else if (id == "art2") {
      setImage(Depression);
    } else if (id == "art3") {
      setImage(GroundingTechniquesImage);
    } else if (id == "art4") {
      setImage(HealthyDiet);
    } else if (id == "art5") {
      setImage(CalmBreathingImage);
    } else if (id == "art6") {
      setImage(Drugs);
    } else if (id == "art7") {
      setImage(Addiction);
    } else if (id == "art8") {
      setImage(Alcohol);
    } else if (id == "art9") {
      setImage(BoostMood);
    } else if (id == "art10") {
      setImage(PhysicalExercise);
    } else if (id == "art11") {
      setImage(Sleep);
    } else if (id == "art12") {
      setImage(Relationships);
    } else if (id == "art13") {
      setImage(SelfIdentity);
    } else if (id == "art14") {
      setImage(AbusiveRelationships);
    }
  }, [id])

  return (
    <Link href={href} className="card w-full h-full bg-[#519aeb] justify-center items-center">
      <div className="card-body justify-start items-start">
        <div className={`flex justify-center items-center md:justify-start md:items-start lg:shrink`}>
          <Image src={image} alt="Photo" className={`w-1200 h-600`} />
        </div>
        <h2 className="card-title justify-evenly text-[#fffdfd] font-semibold mt-[8px] mb-[8px] font-montserrat">{title}</h2>
        <h2 className='text-[#fffdfd] font-montserrat font-[400] font-xs'>{body}</h2>
      </div>
    </Link>
  );
};

export default ArticleCard;

