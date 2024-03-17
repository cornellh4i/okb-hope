import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function IndeterminateCheckbox() {
  const [checked, setChecked] = React.useState([true, false]);
  const [checkedAge] = React.useState([true, false]);
  const [checkedGender] = React.useState([true, false]);
  const [checkedEthnicity] = React.useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const childrenAge = (
    <>
      <FormControlLabel
        label=" 19-29"
        control={<Checkbox checked={checkedAge[0]} onChange={handleChange2} />} />
      <FormControlLabel
        label="30-40"
        control={<Checkbox checked={checkedAge[1]} onChange={handleChange3} />} />
      <FormControlLabel
        label="41-51"
        control={<Checkbox checked={checkedAge[1]} onChange={handleChange3} />} />
      <FormControlLabel
        label="52-62"
        control={<Checkbox checked={checkedAge[1]} onChange={handleChange3} />} /></>
  );

  const childrenGender = (
    <>
      <FormControlLabel
        label="Male"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Female"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="Other"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </>
  );

  const childrenEthnicity = (
    <>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </>
  );

  return (
    <><div className="w-56 bg-white rounded-2xl border-2 border-[#0568a0]">
      <h1 className="ml-3 mt-3"> Age </h1>
      <hr className="w-48 h-0.5 mx-3 my-1 bg-[#0568a0] rounded"></hr>
      <ul className="columns-2 list-none mb-3">
        <div className="mx-3">
          <FormControlLabel
            label="All"
            control={<Checkbox
              checked={checked[0] && checked[1]}
              onChange={handleChange1} />} />
        </div>
        <div className='ml-3 my-0'>
          {childrenAge}
        </div>
      </ul>
    </div><div className="w-56 bg-white rounded-2xl border-2 border-[#0568a0]">
        <h1 className="ml-3 mt-3"> Gender </h1>
        <hr className="w-48 h-0.5 mx-3 my-1 bg-[#0568a0] rounded"></hr>
        <ul className="columns-2 list-none mb-3">
          <div className="mx-3">
            <FormControlLabel
              label="All"
              control={<Checkbox
                checked={checked[0] && checked[1]}
                onChange={handleChange1} />} />
          </div>
          <div className='mx-3 my-1'>
            {childrenGender}
          </div>
        </ul>
      </div><div className="w-56 bg-white rounded-2xl border-2 border-[#0568a0]">
        <h1 className="ml-3 mt-3"> Ethnicitiy</h1>
        <hr className="w-48 h-0.5 mx-3 my-1 bg-[#0568a0] rounded"></hr>
        <ul className="columns-2 list-none mb-3">
          <div className="mx-3">
            <FormControlLabel
              label="All"
              control={<Checkbox
                checked={checked[0] && checked[1]}
                onChange={handleChange1} />} />
          </div>
          <div className='mx-3 my-1'>
            {childrenEthnicity}
          </div>
        </ul>
      </div></>
  );
}