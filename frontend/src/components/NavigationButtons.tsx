
const NavigationButtons = ({ goBack, goNext }) => {

  const LeftArrow =
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray-500" className="w-10 h-10">
      <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clipRule="evenodd" />
    </svg>

  const RightArrow = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray-500" className="w-10 h-10">
    <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>


  return (
    <div className="flex justify-between w-96 h-20">
      <button className="btn w-18 h-20 bg-base-300 hover:bg-gray-400 border-transparent hover:border-transparent" onClick={goBack}>
        {LeftArrow}
      </button>
      <button className="btn w-18 h-20 bg-base-300 hover:bg-gray-400 border-transparent hover:border-transparent" onClick={goNext}>
        {RightArrow}
      </button>
    </div>
  )
}

export default NavigationButtons