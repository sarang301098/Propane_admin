import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const date = moment().endOf('day');

export class SingleDatePickerComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date,
    };
  }

  render() {
    return (
      <React.Fragment>
        <SingleDatePicker
          isDayBlocked={this.props?.isDayBlocked}
          date={this.props?.date ? moment(this.props?.date) : undefined}
          onDateChange={(date) => { this.props.setDate(date?._d); this.setState({ date }) }}
          numberOfMonths={1}
          hideKeyboardShortcutsPanel
          focused={this.state.focused}
          onFocusChange={({ focused }) => this.setState({ focused })}
          id="your_unique_id"
        />
      </React.Fragment>
    );
  }
}

export default SingleDatePickerComp;
