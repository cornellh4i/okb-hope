
// I made the options optional so there can be 1-5 options per question.
const QuestionCard = ({ question, option1, option2, option3, option4, option5 }: { question: string, option1?: string, option2?: string, option3?: string, option4?: string, option5?: string }) => {
  return (
    <div className="card w-96 bg-base-300 text-black">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{question}</h2>
        <div className="card-actions mt-8">
          <button className="btn bg-gray-500 w-full justify-start normal-case border-transparent hover:border-transparent"
            onClick={() => console.log('clicked option 1')}>
            {option1}
          </button>
          <button className="btn bg-gray-500 w-full justify-start normal-case border-transparent hover:border-transparent"
            onClick={() => console.log('clicked option 2')}>
            {option2}
          </button>
          <button className="btn bg-gray-500 w-full justify-start normal-case border-transparent hover:border-transparent"
            onClick={() => console.log('clicked option 3')}>
            {option3}
          </button>
          <button className="btn bg-gray-500 w-full justify-start normal-case border-transparent hover:border-transparent"
            onClick={() => console.log('clicked option 4')}>
            {option4}
          </button>
          <button className="btn bg-gray-500 w-full justify-start normal-case border-transparent hover:border-transparent"
            onClick={() => console.log('clicked option 5')}>
            {option5}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard