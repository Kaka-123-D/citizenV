import faker from "faker";

export const dataMigration = {
  labels: [""],
  datasets: [
    {
      label: "Từ thành thị về nông thôn",
      data: [66],
      borderColor: "rgb(239, 255, 99)",
      backgroundColor: "rgba(252, 255, 99, 0.5)",
    },
    {
      label: "Từ nông thôn về thành thị",
      data: [94],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Từ thành thị về thành thị",
      data: [43],
      borderColor: "rgb(99, 255, 133)",
      backgroundColor: "rgba(99, 255, 151, 0.5)",
    },
    {
      label: "Từ nông thôn về nông thôn",
      data: [13],
      borderColor: "rgb(99, 141, 255)",
      backgroundColor: "rgba(99, 161, 255, 0.5)",
    },
  ],
};

export const dataRegion = {
  labels: ["Thành thị", "Nông thôn"],
  datasets: [
    {
      label: "# of Votes",
      data: [3222, 3893],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};
export const dataAge = {
  labels: ["Nhóm tuổi trẻ em", "Nhóm tuổi lao động", "Nhóm tuổi già"],
  datasets: [
    {
      label: "# of Votes",
      data: [3222, 3893, 4754],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(54, 235, 108, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgb(54, 235, 84)",
      ],
      borderWidth: 1,
    },
  ],
};

export const dataReligion = {
  labels: [
    "Kitô Giáo",
    "Phật Giáo",
    "Đạo Tin Lành",
    "Phật Giáo Hòa Hảo",
    "Đạo Cao Đài",
    "Không thuộc tôn giáo nào",
    "Khác",
  ],
  datasets: [
    {
      label: "name",
      data: [3222345, 3855593, 4444754, 443454, 444544, 343544, 34333],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(54, 235, 108, 0.2)",
        "rgba(181, 235, 54, 0.2)",
        "rgba(235, 187, 54, 0.2)",
        "rgba(139, 54, 235, 0.2)",
        "rgba(235, 54, 181, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgb(54, 235, 84)",
        "rgb(202, 235, 54)",
        "rgb(235, 187, 54)",
        "rgb(148, 54, 235)",
        "rgb(245, 87, 245)",
      ],
      borderWidth: 1,
    },
  ],
};

export const dataEducation = {
  labels: ["Thành thị", "Nông thôn", "Toàn quốc"],
  datasets: [
    {
      label: "Nam",
      data: [333, 458, 938],
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
    },
    {
      label: "Nữ",
      data: [292, 348, 648],
      backgroundColor: ["rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)"],
    },
  ],
};



const labelsTowerAge = [
  "80+",
  "75-79",
  "70-74",
  "65-69",
  "60-64",
  "55-59",
  "50-54",
  "45-49",
  "40-44",
  "35-39",
  "30-34",
  "25-29",
  "20-24",
  "15-19",
  "10-14",
  "05-09",
  "0-04",
];
export const dataTowerAge = {
  labels: labelsTowerAge,
  datasets: [
    {
      label: "Nam",
      stack: "Stack 0",
      backgroundColor: "#d41111",
      data: labelsTowerAge.map(() =>
        faker.datatype.number({ min: 0, max: 100 })
      ),
    },
    {
      label: "Nữ",
      stack: "Stack 0",
      backgroundColor: "#3765b0",
      data: labelsTowerAge
        .map(() => faker.datatype.number({ min: 0, max: 100 }))
        .map((k) => -k),
    },
  ],
};



