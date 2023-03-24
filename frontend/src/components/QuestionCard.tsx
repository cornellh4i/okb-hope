

const QuestionCard = ({ question, option1, option2, option3, option4, option5 }: { question: string, option1?: string, option2?: string, option3?: string, option4?: string, option5?: string }) => {
  return (
    <div className="card w-96 bg-base-300 text-black">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{question}</h2>
        <div className="card-actions mt-8">
          <button className="btn bg-gray-500 w-full justify-start">{option1}</button>
          <button className="btn bg-gray-500 w-full justify-start">{option2}</button>
          <button className="btn bg-gray-500 w-full justify-start">{option3}</button>
          <button className="btn bg-gray-500 w-full justify-start">{option4}</button>
          <button className="btn bg-gray-500 w-full justify-start">{option5}</button>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard