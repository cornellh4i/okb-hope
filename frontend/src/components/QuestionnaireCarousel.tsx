import { useState } from "react";
import QuestionCard from "./QuestionCard";
import NavigationButtons from "./NavigationButtons";

// Some dummy questions
const questions = [
  {
    question: "How are you feeling about your mental health?",
    option1: 'Feeling great!',
    option2: 'Could be better.',
    option3: "I'm not really sure.",
    option4: "I'm not doing too well.",
    option5: "I need some help."
  },
  {
    question: "Describe your happiness on a scale of 1-5.",
    option1: '1',
    option2: '2',
    option3: "3",
    option4: "4",
    option5: "5"
  },
  {
    question: "I want to know how your day is going!",
    option1: "It couldn't be better!",
    option2: "It's off to a great start!",
    option3: "It's neither good nor bad.",
    option4: "It could be better.",
    option5: "I'm not feeling it."
  },
  {
    question: "I want to help! How can I best assist you today?",
    option1: 'Tell me more about mental health.',
    option2: 'Connect me to a psychiatrist.',
    option3: "I just want to talk to someone.",
    option4: "idk idk idk idk idk idk idk",
    option5: "I'm not really sure."
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
        option1={questions[currentQuestionIndex].option1}
        option2={questions[currentQuestionIndex].option2}
        option3={questions[currentQuestionIndex].option3}
        option4={questions[currentQuestionIndex].option4}
        option5={questions[currentQuestionIndex].option5}
      />
      <div className="h-3"></div>
      <NavigationButtons goBack={goBack} goNext={goNext} />
    </div>
  )
}

export default QuestionnaireCarousel