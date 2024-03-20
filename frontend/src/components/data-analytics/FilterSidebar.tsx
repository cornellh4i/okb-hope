import * as React from "react";
import CheckBox from "./Checkbox";

interface AppProps { }

interface ArrObject {
  id: number;
  label: string;
  value: string;
  color: string;
  isChecked: boolean;
}

interface AppState {
  ages: ArrObject[];
  genders: ArrObject[];
  ethnicities: ArrObject[];
}


class Filter extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      ages: [
        { id: 1, label: " 19-29", value: " 19-29", color:"w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 2, label: " 30-40", value: " 30-40", color:"w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 3, label: " 41-51", value: " 41-51", color:"w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 4, label: " 52-62", value: " 52-62", color:"w-4 h-4 accent-[#0568a0]", isChecked: true }
      ],
      genders: [
        { id: 1, label: " Male", value: " Male", color:"w-4 h-4 accent-[#7392c1]", isChecked: true },
        { id: 2, label: " Female", value: " Female", color:"w-4 h-4 accent-[#D371BE]", isChecked: true },
        { id: 3, label: " Other", value: " Other1", color:"w-4 h-4 accent-[#848484]", isChecked: true },
      ],
      ethnicities: [
        { id: 1, label: " Ewe", value: " Ewe", color:"w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 2, label: " Akan", value: " Akan", color:"w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 3, label: " Ga", value: " Ga", color:"w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 4, label: " Other", value: " Other2", color:"w-4 h-4 accent-[#0568a0]", isChecked: true }
      ]
    };
  }

  handleAllCheckedAge = (event: any) => {
    let ages = this.state.ages;
    ages.forEach(age => (age.isChecked = event.target.checked));
    this.setState({ ages: ages });
  };

  handleAllCheckedGender = (event: any) => {
    let genders = this.state.genders;
    genders.forEach(gender => (gender.isChecked = event.target.checked));
    this.setState({ genders: genders })
  };

  handleAllCheckedEthnicity = (event: any) => {
    let ethnicities = this.state.ethnicities;
    ethnicities.forEach(ethnicity => (ethnicity.isChecked = event.target.checked));
    this.setState({ ethnicities: ethnicities })
  };

  handleCheckChildElement = (event: React.FormEvent<HTMLInputElement>) => {
    let ages = this.state.ages;
    ages.forEach(age => {
      if (age.value === event.currentTarget.value) {
        age.isChecked = event.currentTarget.checked;
      }
    });
    this.setState({ ages: ages });

    let genders = this.state.genders;
    genders.forEach(gender => {
      if (gender.value === event.currentTarget.value) {
        gender.isChecked = event.currentTarget.checked;
      }
    });
    this.setState({ genders: genders });

    let ethnicities = this.state.ethnicities;
    ethnicities.forEach(ethnicity => {
      if (ethnicity.value === event.currentTarget.value) {
        ethnicity.isChecked = event.currentTarget.checked;
      }
    });
    this.setState({ ethnicities: ethnicities });
  };

  render() {
    return (
      <>
        <div className="w-56 bg-white rounded-2xl border-2 border-[#0568a0]">
          <h1 className="ml-3 mt-3"> Age </h1>
          <hr className="w-48 h-0.5 mx-3 my-1 bg-[#0568a0] rounded"></hr>
          <ul className="columns-2 list-none mb-3">
            <div className="mx-3">
              <input
                type="checkbox"
                onClick={this.handleAllCheckedAge}
                value="checkedall"
                checked={this.state.ages.every(age => age.isChecked)}
                defaultChecked={true}
                className="w-4 h-4 accent-[#0568a0]"/>{" "}
              All
            </div>
            {this.state.ages.map(age => {
              return (
                <div className="mx-3 my-1">
                  <CheckBox
                    handleCheckChildElement={this.handleCheckChildElement}
                    id={age.id}
                    label={age.label}
                    value={age.value}
                    color={age.color}
                    isChecked={age.isChecked} />
                </div>
              );
            })}
          </ul>
        </div>

        <div className="w-56 bg-white rounded-2xl border-2 border-[#0568a0]">
          <h1 className="ml-3 mt-3"> Gender </h1>
          <hr className="w-48 h-0.5 mx-3 my-1 bg-[#0568a0] rounded"></hr>
          <ul className="columns-2 list-none mb-3">
            <div className="mx-3">
              <input
                type="checkbox"
                onClick={this.handleAllCheckedGender}
                value="checkedall"
                checked={this.state.genders.every(gender => gender.isChecked)}
                defaultChecked={true}
                className="w-4 h-4 accent-[#0568a0]" />{" "}
              All
            </div>
            {this.state.genders.map(gender => {
              return (
                <div className="mx-3 my-1">
                  <CheckBox
                    handleCheckChildElement={this.handleCheckChildElement}
                    id={gender.id}
                    label={gender.label}
                    value={gender.value}
                    color={gender.color}
                    isChecked={gender.isChecked} />
                </div>
              );
            })}
          </ul>
        </div>

        <div className="w-56 bg-white rounded-2xl border-2 border-[#0568a0]">
          <h1 className="ml-3 mt-3"> Ethnicitiy</h1>
          <hr className="w-48 h-0.5 mx-3 my-1 bg-[#0568a0] rounded"></hr>
          <ul className="columns-2 list-none mb-3">
            <div className="mx-3">
              <input
                type="checkbox"
                onClick={this.handleAllCheckedEthnicity}
                value="checkedall"
                checked={this.state.ethnicities.every(ethnicity => ethnicity.isChecked)}
                defaultChecked={true}
                className="w-4 h-4 accent-[#0568a0]"
              />{" "}
              All
            </div>
            {this.state.ethnicities.map(ethnicity => {
              return (
                <div className="mx-3 my-1">
                  <CheckBox
                    handleCheckChildElement={this.handleCheckChildElement}
                    id={ethnicity.id}
                    label={ethnicity.label}
                    value={ethnicity.value}
                    color={ethnicity.color}
                    isChecked={ethnicity.isChecked}
                  />
                </div>
              );
            })}
          </ul>
        </div>

      </>
    );
  }
}

export default Filter;
