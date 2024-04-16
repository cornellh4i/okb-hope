import * as React from "react";
import CheckBox from "./Checkbox";

interface AppProps {
  setGlobalAgeRanges;
  setGlobalGenders;
  setGlobalLanguages
}

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
  languages: ArrObject[];
  setGlobalAgeRanges;
  setGlobalGenders;
  setGlobalLanguages
}

class Filter extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      ages: [
        { id: 1, label: " 18-24", value: " 18-24", color: "w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 2, label: " 25-34", value: " 25-34", color: "w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 3, label: " 35-44", value: " 35-44", color: "w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 4, label: " 45-54", value: " 45-54", color: "w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 5, label: " 55-64", value: " 55-64", color: "w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 6, label: " 65+", value: " 65+", color: "w-4 h-4 accent-[#0568a0]", isChecked: true },

      ],
      genders: [
        { id: 1, label: " Male", value: " Male", color: "w-4 h-4 accent-[#7392c1]", isChecked: true },
        { id: 2, label: " Female", value: " Female", color: "w-4 h-4 accent-[#D371BE]", isChecked: true },
        { id: 3, label: " Other", value: " Other1", color: "w-4 h-4 accent-[#848484]", isChecked: true },
      ],
      languages: [
        { id: 1, label: " Ewe", value: " Ewe", color: "w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 2, label: " Hausa", value: " Hausa", color: "w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 3, label: " Ga", value: " Ga", color: "w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 4, label: " Fante", value: " Fante", color: "w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 5, label: " Twi", value: " Twi", color: "w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 6, label: " English", value: " English", color: "w-4 h-4 accent-[#0568a0]", isChecked: true },
        { id: 7, label: " Other", value: " Other2", color: "w-4 h-4 accent-[#0568a0]", isChecked: true }
      ],
      setGlobalAgeRanges: props.setGlobalAgeRanges,
      setGlobalGenders: props.setGlobalGenders,
      setGlobalLanguages: props.setGlobalLanguages
    };

    this.state.setGlobalAgeRanges(["18-24", "25-34", "35-44", "45-54", "55-64", "65 and over"]);
    this.state.setGlobalGenders([0, 1, 2]);
    this.state.setGlobalLanguages(["Ewe", "Hausa", "Ga", "Fante", "Twi", "English", "Other"]);
  }


  handleAllCheckedAge = (event: any) => {
    const ages = this.state.ages;
    ages.forEach(age => (age.isChecked = event.target.checked));
    this.setState({ ages: ages });
    this.state.setGlobalAgeRanges(["18-24", "25-34", "35-44", "45-54", "55-64", "65 and over"]);
  };

  handleAllCheckedGender = (event: any) => {
    const genders = this.state.genders;
    genders.forEach(gender => (gender.isChecked = event.target.checked));
    this.setState({ genders: genders })
    this.state.setGlobalGenders([0, 1, 2])
  };

  handleAllCheckedLanguage = (event: any) => {
    const languages = this.state.languages;
    languages.forEach(language => (language.isChecked = event.target.checked));
    this.setState({ languages: languages })
    this.state.setGlobalLanguages(["Ewe", "Hausa", "Ga", "Fante", "Twi", "English", "Other"])
  };

  handleCheckChildElement = (event: React.FormEvent<HTMLInputElement>) => {
    const ages = this.state.ages;
    ages.forEach(age => {
      if (age.value === event.currentTarget.value) {
        age.isChecked = event.currentTarget.checked;
      }
    });
    this.setState({ ages: ages });

    const { value } = event.currentTarget;
    const checkedAges = this.state.ages.filter(age => age.isChecked).map(age => age.value.trim());
    // Change "65+" to "65 and over" in the array
    const checkedAgesModified = checkedAges.map(element => {
      if (element === "65+") {
        return "65 and over";
      }
      return element;
    });
    this.state.setGlobalAgeRanges(checkedAgesModified);

    const genders = this.state.genders;
    genders.forEach(gender => {
      if (gender.value === event.currentTarget.value) {
        gender.isChecked = event.currentTarget.checked;
      }
    });
    this.setState({ genders: genders });

    const checkedGenders = this.state.genders.filter(gender => gender.isChecked).map(gender => gender.value.trim());
    // Change "Other1" to "Other" in the array
    const checkedGendersModified = checkedGenders.map(element => {
      if (element === "Other1") {
        return 2;
      } else if (element === "Female")
        return 1;
      else {
        return 0;
      }
    });
    this.state.setGlobalGenders(checkedGendersModified);

    const languages = this.state.languages;
    languages.forEach(language => {
      if (language.value === event.currentTarget.value) {
        language.isChecked = event.currentTarget.checked;
      }
    });
    this.setState({ languages: languages });

    const checkedLanguage = this.state.languages.filter(language => language.isChecked).map(language => language.value.trim());
    // Change "65+" to "65 and over" in the array
    const checkedLanguageModified = checkedLanguage.map(element => {
      if (element === "Other2") {
        return "Other";
      }
      return element;
    });
    this.state.setGlobalLanguages(checkedLanguageModified);

    if (this.state.ages.every(age => !age.isChecked)) {
      this.state.setGlobalAgeRanges(["18-24", "25-34", "35-44", "45-54", "55-64", "65 and over"]);
    }

    if (this.state.genders.every(gender => !gender.isChecked)) {
      this.state.setGlobalGenders([0, 1, 2]);
    }

    if (this.state.languages.every(language => !language.isChecked)) {
      this.state.setGlobalLanguages(["Ewe", "Hausa", "Ga", "Fante", "Twi", "English", "Other"]);
    }

  };

  render() {
    return (
      <>
        <div className="grid grid-cols-1 gap-4 pt-20">
          <div className="w-56 bg-white rounded-2xl border-2 border-[#0568a0]">
            <h1 className="ml-3 mt-3"> Age </h1>
            <hr className="w-48 h-0.5 mx-3 my-1 bg-[#0568a0] rounded"></hr>
            <ul className="columns-2 list-none mb-3">
              <div className="mx-3">
                <input
                  type="checkbox"
                  onChange={this.handleAllCheckedAge}
                  checked={this.state.ages.every(age => age.isChecked)}
                  className="w-4 h-4 accent-[#0568a0]" />{" "}
                All
              </div>
              {this.state.ages.map(age => {
                return (
                  <div key={age.id} className="mx-3 my-1">
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
                  onChange={this.handleAllCheckedGender}
                  checked={this.state.genders.every(gender => gender.isChecked)}
                  className="w-4 h-4 accent-[#0568a0]" />{" "}
                All
              </div>
              {this.state.genders.map(gender => {
                return (
                  <div key={gender.id} className="mx-3 my-1">
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
            <h1 className="ml-3 mt-3"> Language</h1>
            <hr className="w-48 h-0.5 mx-3 my-1 bg-[#0568a0] rounded"></hr>
            <ul className="columns-2 list-none mb-3">
              <div className="mx-3">
                <input
                  type="checkbox"
                  onChange={this.handleAllCheckedLanguage}
                  checked={this.state.languages.every(language => language.isChecked)}
                  className="w-4 h-4 accent-[#0568a0]"
                />{" "}
                All
              </div>
              {this.state.languages.map(language => {
                return (
                  <div key={language.id} className="mx-3 my-1">
                    <CheckBox
                      handleCheckChildElement={this.handleCheckChildElement}
                      id={language.id}
                      label={language.label}
                      value={language.value}
                      color={language.color}
                      isChecked={language.isChecked}
                    />
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Filter;