// Navigation Bar SECTION
const navBar = {
  show: true,
};

// Main Body SECTION
const mainBody = {
  gradientColors: "#4484ce, #1ad7c0, #ff9b11, #9b59b6, #ff7f7f, #ecf0f1",
  firstName: "Frans",
  middleName: "",
  lastName: "Sjöström",
  message: " Making pepoles lives easier while keeping life worth living. ",
  icons: [
    {
      image: "fa-github",
      url: "https://github.com/frallan97",
    },
    {
      image: "fa-linkedin",
      url: "https://www.linkedin.com/in/frans-sj%C3%B6str%C3%B6m-009319125",
    },
  ],
};

// ABOUT SECTION
// If you want the About Section to show a profile picture you can fill the profilePictureLink either with:
//a) your Instagram username
//      i.e:profilePictureLink:"johnDoe123",
//b) a link to an hosted image
//      i.e:profilePictureLink:"www.picturesonline.com/johnDoeFancyAvatar.jpg",
//c) image in "editable-stuff" directory and use require("") to import here,
//      i.e: profilePictureLink: require("../editable-stuff/hashirshoaeb.png"),
//d) If you do not want any picture to be displayed, just leave it empty :)
//      i.e: profilePictureLink: "",
// For Resume either provide link to your resume or import from "editable-stuff" directory
//     i.e resume: require("../editable-stuff/resume.pdf"),
//         resume: "https://docs.google.com/document/d/13_PWdhThMr6roxb-UFiJj4YAFOj8e_bv3Vx9UHQdyBQ/edit?usp=sharing",

const about = {
  show: true,
  heading: "About Me",
  imageLink: require("../editable-stuff/frans_prof.jpg"),
  imageSize: 375,
  message:
    "My name is Frans Sjöström. I’m a graduate of 2023 from Lund's technical university with a master in Computer Engineering. I am intressted in making hard things easy, time counsuming things fast.",
  resume: "https://drive.google.com/file/d/10vZKdPuOCUNj8tKNpp7OrnBoMYCqyiL7/view?usp=sharing",
};

// PROJECTS SECTION
// Setting up project lenght will automatically fetch your that number of recently updated projects, or you can set this field 0 to show none.
//      i.e: reposLength: 0,
// If you want to display specfic projects, add the repository names,
//      i.e ["repository-1", "repo-2"]
const repos = {
  show: true,
  heading: "Recent Projects",
  gitHubUsername: "frallan97", //i.e."johnDoe12Gh"
  reposLength: 2,
  specificRepos: [],
};

// Leadership SECTION
const leadership = {
  show: true,
  heading: "Team work",
  message:`I had the honor to a part of the team of 4 pepole that wrote the ticketsystem used on Lundakarnevalen 2022. 
          The most valueable learning experience to date. The prof that you can do anything you set your mind to if you are 
          willing to spend the time and the sweat. The process was very educative. We had our chare of tuff days with long hours.
           I reed a database course paralel to doing this project. I was told about triggers and transactions in sql databases and 
           what could go wrong. I got to experience them going wrong live. Of course this could be avoided. But doing a large scale 
           system for the first time we feelt great inprovments quickly. Some concluding thoughts from the project was that scale matters 
           and that logging actions can save you a lot of time. The most important takeaway was that admin tools really matters if
            you as the programer do not want to do a lot of manual work. `,
  images: [
    { 
      img: require("../editable-stuff/lundakarnevalens-invigning-2022.jpg"), 
      label: "Lundakarnevalen 2022", 
      paragraph: "Lundakarnevalen 2022" 
    },
    { 
      img: require("../editable-stuff/KB-2014.jpg"), 
      label: "Ticket", 
      paragraph: "Qr-codes sent by mail " 
    },
  ],
  imageSize: {
    width:["615","150"],
    height:["450","450"]
  }
};

// SKILLS SECTION
const skills = {
  show: true,
  heading: "Skills",
  hardSkills: [
    { name: "Python", value: 80 },
    { name: "SQL", value: 70 },
    { name: "Go", value: 70 },
    { name: "C/C++", value: 65 },
    { name: "JavaScript", value: 70 },
    { name: "React", value: 65 },
    { name: "Java", value: 60 },
    { name: "Rust", value: 20 },
  ],
  softSkills: [
    { name: "Partying", value: 80 },
    { name: "Cooking", value: 90 },
    { name: "Running", value: 70 },
    { name: "Adventuring", value: 85 },
    { name: "Problem Solving", value: 75 },
    { name: "Movies", value: 90 },
    { name: "Board games", value: 70 },
    { name: "Organising events", value: 90 },
  ],
};

// GET IN TOUCH SECTION
const getInTouch = {
  show: true,
  heading: "Get In Touch",
  message:
    "I'm always up for a chat, if you have any questions, or if you just want to say hi, please feel free to email me at",
  email: "fransjostrom@gmail.com",
};

const experiences = {
  show: false,
  heading: "Experiences",
  data: [
    {
      role: 'Software Engineer',// Here Add Company Name
      companylogo: require('../assets/img/dell.png'),
      date: 'June 2018 – Present',
    },
    {
      role: 'Front-End Developer',
      companylogo: require('../assets/img/boeing.png'),
      date: 'May 2017 – May 2018',
    },
  ]
}

const donations = {
  show: true,
  address: 0,
}

export { navBar, mainBody, about, repos, skills, leadership, getInTouch, experiences , donations};
