import groomingPrevention from "$lib/assets/groomingProjectSplash.png";
import deulaubaba from "$lib/assets/deulaubaba.png";
import cvBuilder from "$lib/assets/cvBuilder.png";
import weatherApp from "$lib/assets/weatherApp.png";

export const projects = [
  {
    en: {
      title: "Deulaubaba",
      description:
        "A full stack application for parents/teachers/counsellors dealing with students with disabilities. Users can share the student's communication behaviours and collaborate on teaching new behaviours.",
    },
    kr: {
      title: "들어바바",
      description:
        "장애 학생을 지원하는 교사·상담사·보호자를 위한 풀스택 협업 애플리케이션. 학생의 의사소통 행동을 공유하고 새로운 행동 교육에 함께 참여할 수 있습니다",
    },
    image: deulaubaba,
    stack: [
      "skill-icons:react-light",
      "skill-icons:typescript",
      "skill-icons:spring-light",
      "skill-icons:postgresql-light",
    ],
    github: "https://github.com/niallantony/deulaubaba",
  },
  {
    en: {
      title: "Grooming Prevention App",
      description:
        "A simulation game developed in collaboration with special needs educators aimed at helping minors with disabilities recognise online grooming attempts.",
    },
    kr: {
      title: "온라인 그루밍예방 퀴즈",
      description:
        "특수교육 교사들과 공동 개발한 발달장애인 대상 온라인 그루밍 예방 교육을 위한 채팅 시뮬레이션 게임.",
    },
    image: groomingPrevention,
    stack: ["skill-icons:svelte", "skill-icons:vite-light"],
    live: "https://niallantony.github.io/groomingPrevention/",
    github: "https://github.com/niallantony/groomingPrevention",
  },
];

export const moreProjects = [
  {
    en: {
      title: "CV Building App",
      description: "A small react web application for building CVs",
    },
    kr: {
      title: "이력서 만드는 도구",
      description: "이력서를 작성할 수 있는 간단한 React 웹 애플리케이션.",
    },
    image: cvBuilder,
    stack: ["skill-icons:react-light", "skill-icons:vite-light"],
    live: "https://keen-bavarois-da7113.netlify.app",
    github: "https://github.com/niallantony/cv-app?tab=readme-ov-file",
  },
  {
    en: {
      title: "Weather App",
      description: "A small web based weather app to learn about using APIs",
    },
    kr: {
      title: "여러 게임",
      description: "API 활용 학습을 위해 제작한 간단한 웹 기반 날씨 앱",
    },
    image: weatherApp,
    stack: [
      "skill-icons:javascript",
      "skill-icons:css",
      "skill-icons:webpack-light",
    ],
    live: "https://niallantony.github.io/Weather-App/",
    github: "https://github.com/niallantony/Weather-App",
  },
];
