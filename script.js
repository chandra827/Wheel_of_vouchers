/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: "Try Again" },
  { minDegree: 31, maxDegree: 60, value: "$100 Voucher"},
  { minDegree: 0, maxDegree: 30, value: "$200 Voucher" },
  { minDegree: 331, maxDegree: 360, value: "$300 Voucher" },
  { minDegree: 301, maxDegree: 330, value: "$400 Voucher" },
  { minDegree: 271, maxDegree: 300, value: "$500 Voucher"},
  { minDegree: 241, maxDegree: 270, value: "$600 Voucher" },
  { minDegree: 211, maxDegree: 240, value: "$700 Voucher"},
  { minDegree: 181, maxDegree: 210, value: "$800 Voucher" },
  { minDegree: 151, maxDegree: 180, value: "$900 Voucher" },
  { minDegree: 121, maxDegree: 150, value: "$1000 Voucher" },
  { minDegree: 91, maxDegree: 120, value: "$1100 Voucher" },
];

/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#FF0000",
  "#0000FF",
  "#008000",
  "#800080",
  "#FF0000",
  "#0000FF",
  "#008000",
  "#800080",
  "#FF0000",
  "#0000FF",
  "#008000",
  "#800080"
];
/* --------------- Chart --------------------- */

let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>Congratulations, You Have Won: ${i.value} ! </p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
let isFirstSpin = true; // Add this variable

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Best Of Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      if (isFirstSpin) { // Check if it's the first spin
        generateValue(61); // Set the value to 61
        isFirstSpin = false; // Update the variable to false
      } else {
        generateValue(randomDegree); // Generate value based on the random degree
      }
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

/* --------------- End Spin Wheel  --------------------- */