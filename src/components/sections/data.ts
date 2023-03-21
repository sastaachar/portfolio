import { Project, Job } from "@/models/common";

export const projectData: Project[] = [
  {
    id: 1,
    projectLink: "https://sastaachar.github.io/Boids",
    githubLink: "https://github.com/sastaachar/Boids",
    content:
      "Simulation of boids using Three.js and TypeScript.\nBoids are artificial life entities that simulate the flocking behavior\nof birds. The simulation is built using Three.js in typescript. Background of the current site uses a basic version of the this.",
  },
  {
    id: 2,
    projectLink: "https://vieu.netlify.app",
    githubLink: "https://github.com/sastaachar/vieu",
    content:
      "Vieu is video conferencing web application made using WebRTC, React in Typescript, you can find more information on the github readme.",
  },
  {
    id: 3,
    projectLink: "https://sastaachar.github.io/conways-game-of-life",
    githubLink: "https://github.com/sastaachar/conways-game-of-life",
    content:
      'Experience the classic "Conway\'s Game of Life" with an arcade game style.',
  },
  {
    id: 4,
    projectLink: "https://sastaachar.github.io/graphene",
    githubLink: "https://github.com/sastaachar/graphene",
    content:
      "Graphene is a personal project that aims to create and visualize graph data structures and algorithms. The project offers interactive visualizations for various graph algorithms. The goal of the project is to make it easy for users to understand and explore the workings of these algorithms through an intuitive graphical interface. Graphene can be a great tool for students, educators, and researchers who are looking to learn about graph algorithms and their applications.",
  },
];

export const jobData: Job[] = [
  {
    company: "ThoughtSpot",
    title: "Software Engineer",
    desc: "Currently working on cool frontend stuff.",
    startDate: { month: "march", year: 2023 },
    present: true,
  },
  {
    company: "Amazon",
    title: "SDE",
    desc: "Developed Micro services for modeling and transformation of big data using spark and scala.",
    startDate: { month: "oct", year: 2022 },
    endDate: { month: "march", year: 2023 },
    present: false,
  },
  {
    company: "TCS",
    title: "Systems Engineer",
    desc: "At Tata Consultancy Services (TCS) I developed custom tools using CSOM in C# for sharepoint migration and custom Powerapps for clients.",
    startDate: { month: "may", year: 2021 },
    present: false,
    endDate: { month: "sep", year: 2022 },
  },
  {
    company: "Karunya University",
    title: "Student",
    desc: "Survived on cup noodles while learning about computer science engineering.",
    startDate: { month: "jul", year: 2017 },
    present: false,
    endDate: { month: "may", year: 2021 },
  },
];
