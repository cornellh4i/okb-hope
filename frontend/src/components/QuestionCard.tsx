
// I made the options optional so there can be 1-5 options per question.
const QuestionCard = ({ question, options }: { question: string, options: string[] }) => {

  // Abstracted a button that displays the button text and can customize the onClick function
  const OptionButton = ({ onClick, text }) =>
    <button className="btn bg-gray-500 w-full justify-start normal-case border-transparent hover:border-transparent"
      onClick={onClick}>{text}</button>
      
  // Creates an array [0, 1, ..., options.length-1]
  const optionArray = Array.from(Array(options.length).keys())

  return (
    <div className="card w-96 bg-base-300 text-black">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{question}</h2>
        <div className="card-actions mt-8">
          {optionArray.map(option => (
            <OptionButton
              key={option.toString()}
              // The function called for onClick should be changed to some sort of handleSubmit later
              onClick={() => console.log(`clicked option ${option}`)}
              text={options[option]}
            />
          ))}
        </div>
      </div>
    </div >
  )
}

export default QuestionCard
