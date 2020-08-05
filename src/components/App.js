import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import Section from './Section';
import FeedbackOptions from './Button'
import Statistics from './Statistics'
import ListStatistics from './List-Statistics'
import Notification from './Notification'


class  App extends Component {

  static defaultProps = {
    good: 0,
    neutral: 0,
    bad: 0,
    //total
  };

  state = {
    good: this.props.good,
    neutral: this.props.neutral,
    bad: this.props.bad,
  };


  // Events Button
  onLeaveFeedback = (e) => {
    const dataName = e.target.dataset.name 
    this.setState((prevState,props) => {
        return {
          [dataName]:prevState[dataName] + 1
        // такой вариант подошел бы => именно написать в этом методе ? в место ф-и countTotalFeedback
        // total:props.total + props.step
        }
      })
} 

//count the state.object
countTotalFeedback(good,neutral,bad){
  return good+neutral+bad
}
//count percentage good feedback
countPositiveFeedbackPercentage(good ,total){
  return  Math.floor(good/total*100) + '%'
}



  render(){
    const {good , neutral, bad} = this.state;
    const total = this.countTotalFeedback(good,neutral,bad);
    const positive = this.countPositiveFeedbackPercentage(good ,total)
    return (
 
      <Section  title="Please leave feedback" >
            <FeedbackOptions onLeaveFeedback = {this.onLeaveFeedback}/>

            <Statistics title = 'Statistic'>
                { 
                  total > 0 ? <ListStatistics 
                              good ={good}
                              neutral={neutral}
                              bad={bad}
                              total= {total}
                              positive = {positive}/>

                    : <Notification message="No feedback given"/>
                }
            </Statistics>

      </Section>

    )};
}


export default App;
