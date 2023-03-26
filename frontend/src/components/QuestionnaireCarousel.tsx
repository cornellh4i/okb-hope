import { useState } from "react";
import QuestionCard from "./QuestionCard";
import NavigationButtons from "./NavigationButtons";

// Some dummy questions
const questions = [
  {
    question: "How are you feeling about your mental health?",
    options: [
      'Feeling great!',
      'Could be better.',
      "I'm not really sure.",
      "I'm not doing too well.",
    ]
  },
  {
    question: "Describe your happiness on a scale of 1-5.",
    options: [
      '1',
      '2',
      '3'
    ]
  },
  {
    question: "I want to know how your day is going!",
    options: [
      "It couldn't be better!",
      "It's off to a great start!",
    ]
  },
  {
    question: "I want to help! How can I best assist you today?",
    options: [
      'Tell me more about mental health.'
    ]
  }
]


const QuestionnaireCarousel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // This is the amount of questions there are
  const maxQuestionCount = questions.length;
  // This indicates the current question we are on.
  const questionCounter = `${currentQuestionIndex + 1} of ${maxQuestionCount}`

  // Updates the question index to go to the previous question.
  const goBack = () => {
    // If we're on the first question, we want to stay at the first question.
    if (currentQuestionIndex == 0) setCurrentQuestionIndex(0)
    else setCurrentQuestionIndex(currentQuestionIndex - 1);
  }

  // Updates the question index to go to the next question.
  const goNext = () => {
    // If we're on the last question, we want to stay at the last question.
    if (currentQuestionIndex == maxQuestionCount - 1) setCurrentQuestionIndex(maxQuestionCount - 1)
    else setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  return (
    <div>
      <div className="text-center text-xl mb-4">{questionCounter}</div>
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