import React from "react";
import { PopupModal } from "react-calendly";

class Bookings extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <div>
        <button
          className={`bg-okb-blue text-okb-white active:bg-gray-500 font-bold px-12 py-4 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
          onClick={() => this.setState({ isOpen: true })}
        >
          Book Appointment
        </button>
        <PopupModal
          url="https://calendly.com/sz389"
          pageSettings={this.props.pageSettings}
          utm={this.props.utm}
          prefill={this.props.prefill}
          onModalClose={() => this.setState({ isOpen: false })}
          open={this.state.isOpen}
          rootElement={document.getElementById("root")}
        />
      </div>
    );
  }
}

export default Bookings;