import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import Section from './Section/Section';
import FeedbackOptions from './Button/Button'
import Statistics from './Statistics/Statistics'
import ListStatistics from './List-Statistics/ListStatistics'
import Notification from './Notification/Notification'






class  App extends Component {

  static defaultProps = {
    step:1,
    good: 0,
    neutral: 0,
    bad: 0,
  };

  state = {
    good: this.props.good,
    neutral: this.props.neutral,
    bad: this.props.bad,
  };


  
  onLeaveFeedback = (e) => {
    const dataName = e.target.dataset.name 
    this.setState((prevState,props) => {
        return {
          [dataName]:prevState[dataName] + props.step
        // такой вариант подошел бы => именно написать в этом методе ? в место ф-и countTotalFeedback
        // total:props.total + props.step
        }
      })

     
} 

countTotalFeedback(state){
  return Object.values(state).reduce((arr,value)=> arr+= value);  
}

countPositiveFeedbackPercentage(good ,total){
  return  Math.floor(good/total*100)
}



  render(){
    const {good , neutral, bad} = this.state;
    const total = this.countTotalFeedback({...this.state});
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
