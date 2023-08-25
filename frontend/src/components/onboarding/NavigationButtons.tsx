import LeftArrow from "@/assets/left_arrow.svg"
import RightArrow from "@/assets/right_arrow.svg"

const NavigationButtons = ({ goBack, goNext }) => {

  return (
    <div className="flex justify-between w-96 h-20">
      {/* Button to go back to the previous question. */}
      <button
        className="btn flex justify-start w-44 bg-base-500 hover:bg-gray-400 border-transparent hover:border-transparent normal-case text-left"
        onClick={goBack}
      >
        {LeftArrow} Back
      </button>
      {/* Button to go to the next question. */}
      <button
        className="btn flex justify-end w-44 bg-base-500 hover:bg-gray-400 border-transparent hover:border-transparent normal-case"
        onClick={goNext}
      >
        Next {RightArrow}
      </button>
    </div>
  )
}

export default NavigationButtons