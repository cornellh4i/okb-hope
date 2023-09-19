import { useState } from "react";
import QuestionCard from "./QuestionCard";
import NavigationButtons from "./NavigationButtons";

import questions from "@/temp_data/questions.json"

const QuestionnaireCarousel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  /**
   * The amount of questions there are
   */
  const maxQuestionCount = Object.keys(questions).length;
  /**
   * Indicates the current question we are on.
   */
  const questionCounter = `${currentQuestionIndex + 1} of ${maxQuestionCount}`

  /**
   * Moves to either the previous question or stays at the first question, 
   * if we are currently on the first question
   */
  const goBack = () => {
    setCurrentQuestionIndex(currentQuestionIndex === 0 ? 0 :
      currentQuestionIndex - 1);
  }

  /**
   * Moves to either the next question or stays at the last question, 
   * if we are currently on the last question
   */
  const goNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex === maxQuestionCount - 1 ?
      maxQuestionCount - 1 : currentQuestionIndex + 1);
  }

  return (
    <div className="flex-col justify-items-center">
      <div className="w-96 text-center text-xl mb-4">{questionCounter}</div>
      <QuestionCard
        question={questions[currentQuestionIndex].question}
        options={questions[currentQuestionIndex].options}
      />
      <div className="h-3"></div>
      <NavigationButtons goBack={goBack} goNext={goNext} />
    </div>
  )
}

export default QuestionnaireCarousel