const FilterCard = ({ name, username, created, active }) => {
    return (
      <div className="flex items-center mb-2 w-full">
        <input type="checkbox" className="checkbox mr-2" value="checked" />
        <div className='flex justify-between items-center w-full border-solid border-gray-300 border-2 rounded-lg py-2 px-6'>
          <div className="flex items-center gap-x-12">
            <div className="font-medium">{name}</div>
            <div className="font-medium">{username}</div>
            <div className="font-medium">{created}</div>
            <div className="font-medium">{active}</div>
          </div>
          {/* <button className="btn btn-sm rounded-lg bg-gray-300 hover:bg-gray-200 border-none text-black normal-case ml-20" >
            View Profile
          </button> */}
        </div>
      </div>
    )
  }
  
  export default FilterCard