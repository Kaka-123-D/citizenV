export const optionsMigration = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },

  responsive: true,

  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Luồng di cư",
    },
  },
};

export const optionsEducation = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },

  responsive: true,

  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Trong độ tuổi đi học nhưng không được đến trường",
    },
  },
};

export const optionsTowerAge = {
  plugins: {
    tooltip: {
      intersect: true,
      callbacks: {
        label: function (context) {
          var label = context.dataset.label || "";
          var value = context.formattedValue;
          var positiveOnly = value < 0 ? -value : value;
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += positiveOnly;
          }
          return label;
        },
      },
    },
    legend: {
      position: "bottom",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: false,
      ticks: {
        beginAtZero: true,
        callback: (v) => {
          return v < 0 ? -v : v;
        },
      },
    },
    y: {
      stacked: true,
      ticks: {
        beginAtZero: true,
      },
      position: "left",
    },
  },
  indexAxis: "y",
};