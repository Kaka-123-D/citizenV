const User = require('../app/model/User');
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const inquirer = require("inquirer");

dotenv.config();

const { SALT_ROUND } = process.env;
const {
  validationUsername, validationPassword
} = require('../app/validation/UserValidation');

var questions = [
  {
    type: "input",
    name: "username",
    message: "Username?: ",
    validate: function (input) {
      var done = this.async();
      setTimeout(async () => {
        if (!(await validationUsername(input, "register"))) {
          done("Username phải là các chữ số|chữ cái từ 2-20 ký tự và chưa tồn tại!");
          return;
        }
        done(null, true);
      }, 500);
    },
  },
  {
    type: "password",
    name: "password",
    message: "Password?: ",
    validate: function (input) {
      var done = this.async();
      setTimeout(async () => {
        if (!validationPassword(input)) {
          done(
            "Password phải chứa ít nhất 1 chữ, 1 số, 1 ký tự đặc biệt(@$!%*#?&), tối thiểu 8 ký tự!"
          );
          return;
        }
        done(null, true);
      }, 500);
    },
  },
];

inquirer.prompt(questions).then(async (answers) => {
  try {
    const hash = bcrypt.hashSync(answers.password, parseInt(SALT_ROUND));
    await User.create({
      username: answers.username,
      password: hash,
      role: 'all',
      group: 'admin',
    });
    console.log(`Create account ${answers.username} success!`);
  } catch {
    console.log('Create account admin error!');
  }
});