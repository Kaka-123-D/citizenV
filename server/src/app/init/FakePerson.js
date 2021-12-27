const faker = require('faker');
const fs = require('fs');
const path = require('path');
faker.locale = "vi";

const Person = require("../model/Person");
const religions = [
  "Kitô Giáo",
  "Phật Giáo",
  "Đạo Tin Lành",
  "Phật Giáo Hòa Hảo",
  "Đạo Cao Đài",
  "Không",
  "Khác",
];
const educationLevels = [
  "Tiểu Học",
  "Trung Học Cơ Sở",
  "Trung Học Phổ Thông",
  "Trung Cấp",
  "Đại Học",
  "Cao Đẳng",
  "Bậc Sau Đại Học"
]

const data = fs.readFileSync(
  path.join(__dirname, '/persons_address.json')
);
const address_arr = JSON.parse(data);

async function fakePerson() {
  for (let i = 0; i < 2; i++) {
    await Person.create({
      personId: Math.round(Math.random() * 1000000000),
      fullName: faker.name.findName(),
      birthday: new Date(faker.date.between("01/01/1930", new Date())),
      sex: Math.round(Math.random()),
      village: address_arr[faker.datatype.number({ min: 0, max: 10603 })],
      thuongTru: address_arr[faker.datatype.number({ min: 0, max: 10603 })],
      tamTru: address_arr[faker.datatype.number({ min: 0, max: 10603 })],
      religion: religions[faker.datatype.number({ min: 0, max: 6 })],
      educationLevel:
        educationLevels[faker.datatype.number({ min: 0, max: 6 })],
      job:
        Math.round(Math.random()) == 1 ? "Thất Nghiệp" : faker.name.jobTitle(),
    });
    console.log(i);
  }
  return true;
}

fakePerson()
  .then(() => {
    console.log('success');
  })
