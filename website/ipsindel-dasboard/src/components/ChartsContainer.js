import React from 'react'
import {getAllRecords} from "../ispindelService";
import { Line } from 'react-chartjs-2'

export default class ChartsContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            timeStamps: [],
            temperatures: [],
            gravityReadings: []
        }
    }
    async componentDidMount() {
        this.setState({loading: true})
        const records = await this.callApi()
            this.setState({
                timestamps: records.map( record => {return record.Timestamp.S}),
                temperatures: records.map( record => {return parseInt(record.Temperature.S)}),
                gravityReadings: records.map( record => {return parseFloat(record.Gravity.S)}),
            })
        console.log("temps: " + this.state.temperatures)
        console.log("timestamps: " + this.state.timestamps)
        console.log("gravity: " + this.state.gravityReadings)
    }

    async callApi(){
        const records = await getAllRecords()
        console.log("RecievedRecords : " + JSON.stringify(records))
        return records
    }

    getData(){
       return {
            labels: this.state.timestamps,
            datasets: [
                {
                    label: 'Gravity',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(1,2,2,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.gravityReadings
                },
                {
                    label: 'Temperature',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(192,75,75,0.4)',
                    borderColor: 'rgb(192,75,102)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(19,17,17,0)',
                    pointBackgroundColor: '#ffffff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgb(192,75,75)',
                    pointHoverBorderColor: 'rgb(220,220,220)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.temperatures
                }
            ]
        };
    }


    render() {
        return <div>
            <Line data = {this.getData()}
                  options={{
                      scales: {
                          yAxes: [{
                              ticks: {
                                  beginAtZero: true
                              }
                          }]
                      }}}/>
        </div>

    }
}
