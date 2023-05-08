import { useState } from "react";

// Add the onAnswerSelected prop to the component
const QuestionCard = ({ question, options, onAnswerSelected }: { question: string, options: string[], onAnswerSelected: (answer: string) => void }) => {
  // Add state to track the selected option index
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);

  // Update the OptionButton component to accept an index prop
  const OptionButton = ({ onClick, text, index }: { onClick: () => void, text: string, index: number }) =>
    <button className={`btn w-full justify-start normal-case ${
      index === selectedOptionIndex ? "bg-blue-500 text-white" : "bg-gray-500"
    } border-transparent hover:border-transparent`}
      onClick={onClick}>{text}</button>

  const optionArray = Array.from(Array(options.length).keys())

  return (
    <div className="card w-96 bg-base-300 text-black">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{question}</h2>
        <div className="card-actions mt-8">
          {optionArray.map(optionIndex => (
            <OptionButton
              key={optionIndex.toString()}
              // Update the onClick function to set the selectedOptionIndex and call onAnswerSelected
              onClick={() => {
                setSelectedOptionIndex(optionIndex);
                onAnswerSelected(options[optionIndex]);
              }}
              text={options[optionIndex]}
              index={optionIndex} // Pass the optionIndex to the OptionButton component
            />
          ))}
        </div>
      </div>
    </div >
  )
}

export default QuestionCard;
