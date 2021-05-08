import React, { Component } from "react";
// Utility
import { getDates, getData } from "../Utils/utility";

// Chart.js
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export class ChartContainer extends Component {
  state = {
    dates: [],
    visitData: [],
  };
  chartRef = React.createRef();

  componentDidMount() {
    this.generateChart(getDates(new Date()), getData());
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

    new Chart(ctx, {
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

  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default ChartContainer;
