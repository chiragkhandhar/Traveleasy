import React, { Component } from "react";

// Chart.js
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export class ChartContainer extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    let currentDate = new Date();
    const dates = this.getDates(currentDate);
    const data = this.getData();
    this.generateChart(dates, data);
  }

  generateChart = (dates, visitData) => {
    const ctx = this.chartRef.current.getContext("2d");

    const labels = dates;
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Number of Visits",
          data: visitData,
          fill: true,
          borderColor: "rgb(51, 51, 51)",
          tension: 0.1,
        },
      ],
    };
    var myChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  getDates = (currentDate) => {
    let dates = [];

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    currentDate.setDate(currentDate.getDate() - 7);

    for (let i = 0; i < 7; i++) {
      dates[i] = `${currentDate.getFullYear()}-${
        months[currentDate.getMonth()]
      }-${currentDate.getDate()}`;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  getData = () => {
    let data = [];

    let limit = Math.floor(Math.random() * 1000);

    for (let i = 0; i < 7; i++) data.push(Math.floor(Math.random() * limit));

    return data;
  };

  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default ChartContainer;
