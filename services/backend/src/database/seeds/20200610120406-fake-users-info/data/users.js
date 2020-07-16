const moment = require("moment");

module.exports = [
  {
    name: "John Doe",
    email: "john.doe@canada.ca",
    firstName: "John",
    lastName: "Doe",
    telephone: "713-123-4567",
    cellphone: "613-987-6543",
    manager: "Chahine El Chaar",
    teams: ["CDH Studio", "I-talent"],
    firstLanguage: "ENGLISH",
    secondLanguage: "FRENCH",
    preferredLanguage: "ENGLISH",
    linkedin: "linkedinUrl",
    github: "githubUrl",
    interestedInRemote: false,
    exFeeder: false,
    securityClearance: "Secret",
    careerMobility: "Ready for advancement",
    lookingJob: "Casually looking",
    tenure: "Indeterminate",
    talentMatrixResult: "Strong Performer",
    groupLevel: "AS 04",
    actingLevel: "CS 03",
    actingStartDate: moment().subtract(3, "months").toISOString(),
    actingEndDate: moment().add(6, "months").toISOString(),
    officeLocation: {
      streetNumber: 235,
      postalCode: "K1A 0H5",
      city: "Ottawa",
      country: "Canada",
    },
    avatarColor: "#0bdaa3",
    projects: [
      "Landscaping backyard",
      "Calculator prediction mobile application",
      "Government of Canada global information database",
    ],
    employmentInfo: {
      en: {
        jobTitle: "Data Scientist",
        branch: "Chief Information Office",
      },
      fr: {
        jobTitle: "Scientifique des données",
        branch: "Bureau principal de l'information",
      },
    },
    experiences: [
      {
        startDate: moment().subtract(10, "years").toISOString(),
        endDate: moment().subtract(6, "years").toISOString(),
        translations: {
          en: {
            organization: "Banque du Canada",
            jobTitle: "Gestionnaire de projet TI",
            description:
              "Livrer les project à temps et maintenir le contact avec les clients",
          },
        },
      },
    ],
    proficiencies: [
      {
        proficiency: "ORAL",
        date: new Date(),
        level: "B",
      },
      {
        proficiency: "WRITING",
        date: new Date(),
        level: "X",
      },
      {
        proficiency: "READING",
        date: new Date(),
        level: "C",
      },
    ],
    skills: [
      "Clerical",
      "Executive Support",
      "Teaching (Instructor)",
      "Statistics",
      "Financial Policy",
      "Data Mining",
      "Politics",
      "Entrepreneurship",
      "Political Science",
      "Engineering",
      "AJAX",
      "ASP",
      "C#",
      "Linux",
      "CGI",
    ],
    mentorshipSkills: [
      "Clerical",
      "Executive Support",
      "Teaching (Instructor)",
    ],
    developmentalGoals: [
      "Java",
      "JavaScript",
      "Leading Teams",
      "Change Management",
      "Business Planning",
      "Coding",
      "User Research",
      "Web Publishing",
      "Perspective",
      "Planning",
      "Presentation Skills",
      "Managing Through Systems",
      "Technical Learning",
    ],
    compentencies: [
      "Mobilize People",
      "Achieve Results",
      "Budget",
      "Career Ambition",
      "Compassion",
      "Delegation",
    ],
    educations: [
      {
        startDate: moment().subtract(10, "years").toISOString(),
        endDate: moment().subtract(6, "years").toISOString(),
        diploma: "Bachelor of Applied GIS",
        school: "Carleton University",
      },
      {
        startDate: moment().subtract(6, "years").toISOString(),
        endDate: moment().subtract(4, "years").toISOString(),
        diploma: "Master of Science -Int.Develop",
        school: "Carleton University",
      },
    ],
    relocationLocations: [],
    visibleCards: {
      info: "PUBLIC",
      talentManagement: "PUBLIC",
      officialLanguage: "PUBLIC",
      skills: "PUBLIC",
      competencies: "PUBLIC",
      developmentalGoals: "PUBLIC",
      education: "PUBLIC",
      experience: "PUBLIC",
      projects: "PUBLIC",
      careerInterests: "PUBLIC",
      mentorshipSkills: "PUBLIC",
      exFeeder: "PUBLIC",
    },
  },
  {
    name: "Mary Doe",
    email: "mary.doe@canada.ca",
    firstName: "Mary",
    lastName: "Doe",
    telephone: "343-123-4567",
    cellphone: "613-123-4567",
    manager: "Chahine El Chaar",
    teams: ["CDH Studio"],
    firstLanguage: "FRENCH",
    secondLanguage: "ENGLISH",
    preferredLanguage: "FRENCH",
    linkedin: "linkedinUrl",
    github: "githubUrl",
    gcconnex: "gcconnexUrl",
    interestedInRemote: true,
    exFeeder: true,
    securityClearance: "Top Secret",
    careerMobility: "Develop in role",
    lookingJob: "Not looking",
    tenure: "Term",
    talentMatrixResult: "Early promise",
    groupLevel: "CS 05",
    officeLocation: {
      streetNumber: 160,
      postalCode: "K2P 2P7",
      city: "Ottawa",
      country: "Canada",
    },
    avatarColor: "#ad4463",
    projects: ["Gardening strawberries", "AI powered translator"],
    employmentInfo: {
      en: {
        jobTitle: "Manager",
        branch: "Human Resources Branch",
      },
      fr: {
        jobTitle: "Scientifique des données",
        branch: "Direction générale des ressources humaines",
      },
    },
    experiences: [
      {
        startDate: moment().subtract(15, "years").toISOString(),
        endDate: moment().subtract(6, "years").toISOString(),
        translations: {
          en: {
            organization: "Healt Canada",
            jobTitle: "Medical Officer",
            description:
              "Overseeing the medical care of patients and the functions performed by medical staff",
          },
        },
      },
      {
        startDate: moment().subtract(6, "years").toISOString(),
        endDate: moment().subtract(2, "years").toISOString(),
        translations: {
          en: {
            organization: "Canada Revenue Agency",
            jobTitle: "Financial Analyst",
            description:
              "Cancelled payments and monitored unauthorized purchases",
          },
        },
      },
    ],
    visibleCards: {
      info: "PUBLIC",
      talentManagement: "PUBLIC",
      officialLanguage: "PUBLIC",
      skills: "PUBLIC",
      competencies: "PUBLIC",
      developmentalGoals: "PUBLIC",
      education: "PUBLIC",
      experience: "PUBLIC",
      projects: "PUBLIC",
      careerInterests: "PUBLIC",
      mentorshipSkills: "PUBLIC",
      exFeeder: "PUBLIC",
    },
    organizations: [
      [
        {
          en: "Innovation, Science and Economic Development Canada",
          fr: "Innovation, Sciences et Développement économique Canada",
          tier: 0,
        },
        {
          en: "DIGITAL TRANSFORMATION SERVICE SECTOR",
          fr: "SECTEUR DES SERVICES DE TRANSFORMATION NUMERIQUE",
          tier: 1,
        },
        {
          en: "Chief Information Office",
          fr: "Bureau de l'information en chef",
          tier: 2,
        },
        {
          en: "Digital Services Division",
          fr: "Division des services numériques",
          tier: 3,
        },
        {
          en: "Business Line Solutions Directorate",
          fr: "Direction des solutions métiers",
          tier: 4,
        },
      ],
      [
        {
          en: "Innovation, Science and Economic Development Canada",
          fr: "Innovation, Sciences et Développement économique Canada",
          tier: 0,
        },
        {
          en: "DIGITAL TRANSFORMATION SERVICE SECTOR",
          fr: "SECTEUR DES SERVICES DE TRANSFORMATION NUMERIQUE",
          tier: 1,
        },
        {
          en: "Chief Information Office",
          fr: "Bureau de l'information en chef",
          tier: 2,
        },
        {
          en: "Digital Services Division",
          fr: "Division des services numériques",
          tier: 3,
        },
        {
          en: "Director General's Office",
          fr: "Bureau du directeur général",
          tier: 4,
        },
      ],
    ],
    proficiencies: [
      {
        proficiency: "ORAL",
        date: new Date(),
        level: "A",
      },
      {
        proficiency: "WRITING",
        date: new Date(),
        level: "B",
      },
      {
        proficiency: "READING",
        date: new Date(),
        level: "E",
      },
    ],
    skills: [
      "Partnerships and Networks",
      "GBA+ Policy",
      "Accessibility",
      "Indigenous Cultural Competence",
      "Acquisition",
      "Procurement Risk Management",
      "Crisis Communications",
      "Incident Command",
      "Market Research",
      "Data Entry",
      "Legal Research",
    ],
    mentorshipSkills: [
      "Incident Command",
      "Market Research",
      "Data Entry",
      "Legal Research",
    ],
    developmentalGoals: [
      "Written Communications",
      "Managing Vision and Purpose",
      "Understanding Others",
      "Mobilize People",
      "Create Vision and Strategy",
      "Uphold Integrity and Respect",
      "Manage People",
      "Budget",
      "Policies",
    ],
    compentencies: [
      "Business Acumen",
      "Career Ambition",
      "Caring About Direct Reports",
      "Comfort Around Higher Management",
      "Command Skills",
      "Compassion",
      "Composure",
    ],
    educations: [
      {
        startDate: moment().subtract(20, "years").toISOString(),
        endDate: moment().subtract(16, "years").toISOString(),
        diploma: "Bachelor of Science (Honours)",
        school: "Ottawa, University of",
      },
    ],
    relocationLocations: [
      {
        streetNumber: 107,
        postalCode: "P1B 7K8",
        city: "North Bay",
        country: "Canada",
      },
      {
        streetNumber: 345,
        postalCode: "L3Y 8P6",
        city: "Newmarket",
        country: "Canada",
      },
    ],
  },
];
