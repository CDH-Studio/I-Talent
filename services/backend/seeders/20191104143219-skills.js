// category = require('../models/category');
//categoriesSeeded = category.findAll({attributes:['id'], raw:true});
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
   return queryInterface.bulkInsert(
    "skills",
    [
      {
        descriptionEn: "Coordinating and Organizing",
        descriptionFr: "Coordination et organisation",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1
      },
      {
        descriptionEn: "Clerical",
        descriptionFr: "Travail administratif",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1
      },
      {
        descriptionEn: "Executive Support",
        descriptionFr: "Soutien à la haute direction",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1
      },
      {
        descriptionEn: "Business Operations",
        descriptionFr: "Activités opérationnelles",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1
      },
      {
        descriptionEn: "Internal Audit",
        descriptionFr: "Vérification interne",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2
      },
      {
        descriptionEn: "Risk Assessment",
        descriptionFr: "Évaluation des risques",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2
      },
      {
        descriptionEn: "Evaluation (general)",
        descriptionFr: "Évaluation (généralités)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2
      },
      {
        descriptionEn: "Evaluation (learning impact)",
        descriptionFr: "Évaluation (Impact de l’apprentissage)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2
      },
      {
        descriptionEn: "Quality Assurance",
        descriptionFr: "Assurance de la qualité",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2
      },
      {
        descriptionEn: "Troubleshooting (process/system)",
        descriptionFr: "Dépannage (processus/système)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2
      },
      {
        descriptionEn: "Partnerships and Networks",
        descriptionFr: "Partenariats et réseaux",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 3
      },
      {
        descriptionEn: "Negotiating and Adjudicating",
        descriptionFr: "Négociation et octroi de marchés",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 3
      },
      {
        descriptionEn: "Stakeholder Engagement",
        descriptionFr: "Mobilisation des intervenants",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 3
      },
      {
        descriptionEn: "Customer Satisfaction",
        descriptionFr: "Satisfaction du client",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 3
      },
      {
        descriptionEn: "Customer Relationship Management (CRM)",
        descriptionFr: "Gestion de la relation client (GRC)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 3
      },
      {
        descriptionEn: "Accounting Operations",
        descriptionFr: "Opérations comptables",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 4
      },
      {
        descriptionEn: "Financial Analysis",
        descriptionFr: "Analyse financière",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 4
      },
      {
        descriptionEn: "Planning and Resource Management",
        descriptionFr: "Planification et gestion des ressources",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 4
      },
      {
        descriptionEn: "Financial Policy",
        descriptionFr: "Politique financière",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 4
      },
      {
        descriptionEn: "Financial Systems",
        descriptionFr: "Systèmes financiers",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 4
      },
      {
        descriptionEn: "Incident Command",
        descriptionFr: "Commandement en cas d’incident",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 5
      },
      {
        descriptionEn: "Crisis Communications",
        descriptionFr: "Communications en situation de crise",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 5
      },
      {
        descriptionEn: "Event Planning",
        descriptionFr: "Planification d’événements",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 6
      },
      {
        descriptionEn: "Strategic Communications",
        descriptionFr: "Communications stratégiques",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 6
      },
      {
        descriptionEn: "Speech Writing",
        descriptionFr: "Rédaction de discours",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 6
      },
      {
        descriptionEn: "Media Relations",
        descriptionFr: "Relations avec les médias",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 6
      },
      {
        descriptionEn: "Marketing",
        descriptionFr: "Marketing",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 6
      },
      {
        descriptionEn: "Social Media",
        descriptionFr: "Médias sociaux",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 6
      },
      {
        descriptionEn: "Telecommunications",
        descriptionFr: "Télécommunications",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 6
      },
      {
        descriptionEn: "Report Writing",
        descriptionFr: "Rédaction de rapports",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 6
      },
      {
        descriptionEn: "Proposal Writing",
        descriptionFr: "Rédaction de propositions",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 6
      },
      {
        descriptionEn: "Corporate Communications",
        descriptionFr: "Communications corporatives",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 6
      },
      {
        descriptionEn: "Internal Communications",
        descriptionFr: "Communications internes",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 6
      },
      {
        descriptionEn: "Communications Planning",
        descriptionFr: "Planification des communications",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 6
      },
      {
        descriptionEn: "Data Analytics",
        descriptionFr: "Analyse des données",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 7
      },
      {
        descriptionEn: "Business Intelligence",
        descriptionFr: "Outils de renseignements d'affaires",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 7
      },
      {
        descriptionEn: "Sanitizing Data",
        descriptionFr: "Expurgation des données",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 7
      },
      {
        descriptionEn: "Data Mining",
        descriptionFr: "Exploration des données",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 7
      },
      {
        descriptionEn: "Data Visualization",
        descriptionFr: "Visualisation des données",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 7
      },
      {
        descriptionEn: "Data Analysis",
        descriptionFr: "Analyse de données",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 7
      },
      {
        descriptionEn: "Databases",
        descriptionFr: "Bases de données",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 7
      },
      {
        descriptionEn: "Agile Development",
        descriptionFr: "Développement agile",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Cloud Computing",
        descriptionFr: "Infonuagique",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Artificial Intelligence/ Machine Learning",
        descriptionFr: "Intelligence artificielle/apprentissage machine",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Coding",
        descriptionFr: "Codage",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Graphic Design",
        descriptionFr: "Graphisme",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Content Design",
        descriptionFr: "Conception de contenu",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Cyber Security",
        descriptionFr: "Cyber-sécurité",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Development Operations (DevOps)",
        descriptionFr: "Opérations de développement (« DevOps »)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "User Experience (UX) Design",
        descriptionFr: "Conception d’expérience utilisateur",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "User Research",
        descriptionFr: "Recherche utilisateur",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Social Media Analytics",
        descriptionFr: "Social Media Analytics",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "User Interface (UI) Design",
        descriptionFr: "Conception d’interface utilisateur",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Web Design and Development",
        descriptionFr: "Réalisation et conception Web",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Web Publishing",
        descriptionFr: "Publication Web",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Data Literacy",
        descriptionFr: "Culture des données",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Learning Technologies",
        descriptionFr: "Technologies d’apprentissage",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Digital Learning Development and Production",
        descriptionFr: "Élaboration et production de matériel d’apprentissage numérique",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Technical Support",
        descriptionFr: "Soutien technique",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Troubleshooting (electronic)",
        descriptionFr: "Dépannage (électronique)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Wireless Technologies",
        descriptionFr: "Technologies sans fil",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Web Content Writing",
        descriptionFr: "Rédaction de contenu Web",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Software Development Life Cycle",
        descriptionFr: "Cycle de vie du développement du logiciel",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Web Applications",
        descriptionFr: "Applications Web",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Microsoft Access",
        descriptionFr: "Microsoft Access",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Spectrum Management",
        descriptionFr: "Gestion du spectre",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 8
      },
      {
        descriptionEn: "Human Resources Management",
        descriptionFr: "Gestion des ressources humaines",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Organizational Design",
        descriptionFr: "Conception organisationnelle",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Enterprise Architecture",
        descriptionFr: "Architecture d'entreprise",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Classification",
        descriptionFr: "Classification",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Staffing (Operations)",
        descriptionFr: "Dotation (Opérations)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Staffing (Policy)",
        descriptionFr: "Dotation (Politique)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Performance Management",
        descriptionFr: "Gestion du rendement",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Talent Management",
        descriptionFr: "Gestion des talents",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Values and Ethics",
        descriptionFr: "Valeurs et éthique",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "HR to Pay",
        descriptionFr: "RH à la paye",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Human Resources Management Systems",
        descriptionFr: "Systèmes de gestion des ressources humaines",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Phoenix",
        descriptionFr: "Phénix",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Compensation Liaison",
        descriptionFr: "Liaison en matière de rémunération",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Employment Equity",
        descriptionFr: "Équité en matière d’emploi",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Official Languages",
        descriptionFr: "Langues officielles",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Informal Conflict Resolution",
        descriptionFr: "Résolution informelle des conflits",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Ombudsman",
        descriptionFr: "Ombudsman",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Workplace well-being",
        descriptionFr: "Mieux-être en milieu de travail",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Labour Relations (Policy)",
        descriptionFr: "Relations de travail (Politique)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Labour Relations (Operations)",
        descriptionFr: "Relations de travail (Opérations)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Recruiting",
        descriptionFr: "Recrutement",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 9
      },
      {
        descriptionEn: "Foresight",
        descriptionFr: "Prospective",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 10
      },
      {
        descriptionEn: "Design Thinking",
        descriptionFr: "Pensée conceptuelle",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 10
      },
      {
        descriptionEn: "Experimentation",
        descriptionFr: "Expérimentation",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 10
      },
      {
        descriptionEn: "Systems Thinking",
        descriptionFr: "Pensée systémique",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 10
      },
      {
        descriptionEn: "Prototyping",
        descriptionFr: "Prototypage",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 10
      },
      {
        descriptionEn: "Insurgency",
        descriptionFr: "Insurrection",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 10
      },
      {
        descriptionEn: "Open Policy-Making",
        descriptionFr: "Élaboration ouverte de politiques",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 10
      },
      {
        descriptionEn: "Document Management",
        descriptionFr: "Gestion des documents",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 11
      },
      {
        descriptionEn: "Information Technology",
        descriptionFr: "Technologie de l'information",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 11
      },
      {
        descriptionEn: "Qualitative Research",
        descriptionFr: "Recherche qualitative",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 11
      },
      {
        descriptionEn: "Quantitative Research",
        descriptionFr: "Recherche quantitative",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 11
      },
      {
        descriptionEn: "Intellectual Property",
        descriptionFr: "Propriété intellectuelle",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 11
      },
      {
        descriptionEn: "Gender-Based Analysis + (GBA+) Analysis",
        descriptionFr: "Analyse comparative entre les sexes + (ACS+)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 12
      },
      {
        descriptionEn: "GBA+ Policy",
        descriptionFr: "Politique d’ACS+",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 12
      },
      {
        descriptionEn: "Accessibility",
        descriptionFr: "Accessibilité",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 12
      },
      {
        descriptionEn: "Indigenous Cultural Competence",
        descriptionFr: "Compétence culturelle des Autochtones",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 12
      },
      {
        descriptionEn: "Managing Resources (Assets and Funds)",
        descriptionFr: "Gestion des ressources (biens et fonds)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Managing Programs",
        descriptionFr: "Gestion des programmes",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Managing Projects",
        descriptionFr: "Gestion de projets",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Performance Measurement",
        descriptionFr: "Mesure du rendement",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Building Teams",
        descriptionFr: "Constitution d’équipes",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Managing People",
        descriptionFr: "Gestion des personnes",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Mobilizing People",
        descriptionFr: "Mobilisation des personnes",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Growing Leaders",
        descriptionFr: "Croissance des leaders",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Leading Teams",
        descriptionFr: "Direction des équipes",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Change Leadership and Innovation",
        descriptionFr: "Innovation et leadership du changement",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Change Management",
        descriptionFr: "Gestion du changement",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Requirements Analysis",
        descriptionFr: "Analyse des besoins",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Business Planning",
        descriptionFr: "Planification des activités",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Management Consulting",
        descriptionFr: "Consultation en gestion",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Leadership Development",
        descriptionFr: "Développement du leadership",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Program Evaluation",
        descriptionFr: "Évaluation du programme",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Agile Methodologies",
        descriptionFr: "Méthodologies agiles",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 13
      },
      {
        descriptionEn: "Psychometric Tool Debriefing",
        descriptionFr: "Compte rendu sur les résultats des outils psychométriques",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 14
      },
      {
        descriptionEn: "Facilitating (online/virtual)",
        descriptionFr: "Animation (en ligne/virtuelle)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 14
      },
      {
        descriptionEn: "Producing Virtual Classes",
        descriptionFr: "Production de cours virtuels",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 14
      },
      {
        descriptionEn: "Teaching (Instructor)",
        descriptionFr: "Enseignement (instructeur)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 14
      },
      {
        descriptionEn: "Moderating (online/virtual)",
        descriptionFr: "Modération (en ligne/virtuelle)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 14
      },
      {
        descriptionEn: "Facilitating (in person)",
        descriptionFr: "Animation (en personne)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 14
      },
      {
        descriptionEn: "Research",
        descriptionFr: "Recherche",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 15
      },
      {
        descriptionEn: "Analysis",
        descriptionFr: "Analyse",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 15
      },
      {
        descriptionEn: "Cost Benefit Analysis",
        descriptionFr: "Analyse coûts-avantages",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 15
      },
      {
        descriptionEn: "Economic Modeling",
        descriptionFr: "Modélisation économique",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 15
      },
      {
        descriptionEn: "Statistics",
        descriptionFr: "Statistiques",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 15
      },
      {
        descriptionEn: "Public Policy",
        descriptionFr: "Politique publique",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 15
      },
      {
        descriptionEn: "Policy Development",
        descriptionFr: "Élaboration de politiques",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 15
      },
      {
        descriptionEn: "Economics",
        descriptionFr: "Économie",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 16
      },
      {
        descriptionEn: "Economic Development",
        descriptionFr: "Développement économique",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 16
      },
      {
        descriptionEn: "Engineering",
        descriptionFr: "Ingénierie",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 16
      },
      {
        descriptionEn: "Politics",
        descriptionFr: "Politique",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 16
      },
      {
        descriptionEn: "Entrepreneurship",
        descriptionFr: "Entrepreuneriat",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 16
      },
      {
        descriptionEn: "Political Science",
        descriptionFr: "Sciences politiques",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 16
      },
      {
        descriptionEn: "Project Assessment and Planning",
        descriptionFr: "Évaluation et approbation des projets",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 17
      },
      {
        descriptionEn: "Acquisition",
        descriptionFr: "Acquisition",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 17
      },
      {
        descriptionEn: "Managing Contracts",
        descriptionFr: "Gestion des contrats",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 17
      },
      {
        descriptionEn: "Procurement Negotiations",
        descriptionFr: "Négociations en approvisionnement",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 17
      },
      {
        descriptionEn: "Procurement Risk Management",
        descriptionFr: "Gestion des risques liés à l’approvisionnement",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 17
      },
      {
        descriptionEn: "Procurement Evaluation and Selection",
        descriptionFr: "Évaluation des soumissions",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 17
      },
      {
        descriptionEn: "International Trade",
        descriptionFr: "Commerce international",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 18
      },
      {
        descriptionEn: "International Development",
        descriptionFr: "Développement international",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 18
      },
      {
        descriptionEn: "International Relations",
        descriptionFr: "Relations internationales",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 18
      },
      {
        descriptionEn: "Foreign Policy",
        descriptionFr: "Politique étrangère",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 18
      },
      {
        descriptionEn: "Designing Learning Content",
        descriptionFr: "Conception de contenu d’apprentissage",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 19
      },
      {
        descriptionEn: "Designing Learning Products",
        descriptionFr: "Conception de produits d’apprentissage",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 19
      },
      {
        descriptionEn: "Designing Learning Curricula",
        descriptionFr: "Conception de programmes d’apprentissage",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 19
      },
      {
        descriptionEn: "Training Needs Analysis",
        descriptionFr: "Analyse des besoins en formation",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 19
      },
      {
        descriptionEn: "Briefing",
        descriptionFr: "Séance d’information",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Business Analysis",
        descriptionFr: "Analyse opérationnelle",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Writing and Editing",
        descriptionFr: "Rédaction et révision",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Public Speaking",
        descriptionFr: "Parler en public",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Communicating Professionally",
        descriptionFr: "Communications professionnelles",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Critical Thinking",
        descriptionFr: "Esprit critique",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Execution/Implementation",
        descriptionFr: "Exécution/Mise en œuvre",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Storytelling",
        descriptionFr: "Narration",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Advising and Consulting",
        descriptionFr: "Conseils et consultation",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Managing Issues",
        descriptionFr: "Gestion des enjeux",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Strategic Thinking",
        descriptionFr: "Réflexion stratégique",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Client Service",
        descriptionFr: "Services à la clientèle",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Planning",
        descriptionFr: "Planification",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Analytical Skills",
        descriptionFr: "Compétences analytiques",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Market Research",
        descriptionFr: "Études de marché",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Research and Development (R&D)",
        descriptionFr: "Recherche et développement (R et D)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Data Entry",
        descriptionFr: "Saisie de données",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Legal Research",
        descriptionFr: "Recherche juridique",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 20
      },
      {
        descriptionEn: "Linux",
        descriptionFr: "Linux",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Matlab",
        descriptionFr: "Matlab",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: ".NET Framework",
        descriptionFr: "Infrastructure .NET",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: ".Net Core",
        descriptionFr: "Noyau .Net",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Adobe ExtendScript",
        descriptionFr: "Adobe ExtendScript",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "AJAX",
        descriptionFr: "AJAX",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "ASP",
        descriptionFr: "ASP",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "ASP.Net",
        descriptionFr: "ASP.Net",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "ASP.Net MVC Web applications",
        descriptionFr: "Applications Web contrôleur d’affichage des modèles (MVC) ASP.Net",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "BASH and BSH",
        descriptionFr: "BASH et BSH",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Beyond 20/20 - publisher edition",
        descriptionFr: "Beyond 20/20—Publisher's Edition",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Blaise",
        descriptionFr: "Blaise",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "C / C++",
        descriptionFr: "C / C++",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "C#",
        descriptionFr: "C#",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "CGI",
        descriptionFr: "CGI",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "CKAN",
        descriptionFr: "CKAN",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "ColdFusion",
        descriptionFr: "ColdFusion",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "CSLA Framework",
        descriptionFr: "Infrastructure CSLA",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "CSS 3",
        descriptionFr: "CSS 3",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Drupal",
        descriptionFr: "Drupal",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "D3",
        descriptionFr: "D3",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "HTML 4",
        descriptionFr: "HTML 4",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "HTML 5",
        descriptionFr: "HTML 5",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Infragistics",
        descriptionFr: "Infragistics",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Java",
        descriptionFr: "Java",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "JavaScript",
        descriptionFr: "JavaScript",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Jdeveloper (Oracle BPM)",
        descriptionFr: "Jdeveloper (Oracle BPM)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "jQuery",
        descriptionFr: "jQuery",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Korn shell (ksh) - could be the same as shell scripts",
        descriptionFr: "Korn shell (ksh) — pourrait être identique aux scripts shell",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Log parser",
        descriptionFr: "Log Parser",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "MS Visual Studio",
        descriptionFr: "Visual Studio de Microsoft",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "MS Windows Active Directory Scripting",
        descriptionFr: "Écriture de scripts Active Directory sous Windows de Microsoft",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "MS Windows cscript",
        descriptionFr: "Cscript sous Windows de Microsoft",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "MS Windows Office Suite Macros & VBA",
        descriptionFr: "Macros et VBA pour la suite Office sous Windows de Microsoft",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "MS Windows PowerShell",
        descriptionFr: "PowerShell sous Windows de Microsoft",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "MS Windows Script Host (WSH)",
        descriptionFr: "Windows Script Host (WSH) de Microsoft",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "NetBeans",
        descriptionFr: "NetBeans",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Node.js",
        descriptionFr: "Node.js",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "OpenText Content Server (GCDOCS)",
        descriptionFr: "Serveur de contenu OpenText (GCdocs)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Perl",
        descriptionFr: "Perl",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "PL/SQL",
        descriptionFr: "PL/SQL",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "T-SQL",
        descriptionFr: "T-SQL",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "SQL Developer",
        descriptionFr: "SQL Developer",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Power Shell",
        descriptionFr: "Power Shell",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Python",
        descriptionFr: "Python",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "SAS (Base, Macro)",
        descriptionFr: "SAS (Base, Macro)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "SAS JMP",
        descriptionFr: "SAS JMP",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Sharepoint",
        descriptionFr: "Sharepoint",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Shell Scripts",
        descriptionFr: "Scripts Shell",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Single sign-on software (i.e. ADFS, GetAccess)",
        descriptionFr: "Logiciel à authentification unique (c.-à-d. ADFS, GetAccess)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "SOLR",
        descriptionFr: "Solr",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Spring loC / DI",
        descriptionFr: "Spring loC / DI",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Ultraseek (search engine)",
        descriptionFr: "Ultraseek (moteur de recherche)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "VB.NET",
        descriptionFr: "VB.NET",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Win Runner",
        descriptionFr: "WinRunner",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Windows Scripting (.bat)",
        descriptionFr: "Scripts Windows (.bat)",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "XML",
        descriptionFr: "XML",
        type: "skill",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 21
      },
      {
        descriptionEn: "Demonstrating integrity and respect",
        descriptionFr: "Faire preuve d'intégrité et de respect",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Thinking Things Through",
        descriptionFr: "Réflexion approfondie",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Working Effectively with Others",
        descriptionFr: "Travailler efficacement avec les autres",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Showing Initiative and Being Action-Oriented",
        descriptionFr: "Faire preuve d’initiative et être orienté vers l’action",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Uphold Integrity and Respect",
        descriptionFr: "Préserver l’intégrité et le respect",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Create Vision and Strategy",
        descriptionFr: "Créer une vision et une stratégie",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Mobilize People",
        descriptionFr: "Mobiliser les personnes",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Collaborate with Partners and Stakeholders",
        descriptionFr: "Collaborer avec les partenaires et les intervenants",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Promote Innovation and Guide Change",
        descriptionFr: "Promouvoir l’innovation et orienter le changement",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Achieve Results",
        descriptionFr: "Obtenir des résultats",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Manage People",
        descriptionFr: "Gérer les gens",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Budget",
        descriptionFr: "Budget",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Policies",
        descriptionFr: "Politiques",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Corporate",
        descriptionFr: "Corporatif",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Action Oriented",
        descriptionFr: "Être orienté vers l’action",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Dealing with Ambiguity",
        descriptionFr: "Savoir gérer l’incertitude et l’ambiguïté",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Approachability",
        descriptionFr: "Être d’un abord facile",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Boss Relationships",
        descriptionFr: "Avoir de bonnes relations avec ses supérieurs",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Business Acumen",
        descriptionFr: "Avoir le sens des affaires",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Career Ambition",
        descriptionFr: "Avoir de l’ambition",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Caring About Direct Reports",
        descriptionFr: "Être attentif à ses collaborateurs directs",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Comfort Around Higher Management",
        descriptionFr: "Se sentir à l’aise dans les rapports avec la direction générale",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Command Skills",
        descriptionFr: "Savoir commander",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Compassion",
        descriptionFr: "Faire preuve de compassion",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Composure",
        descriptionFr: "Avoir la maîtrise de soi",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Conflict Management",
        descriptionFr: "Savoir gérer les conflits",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Confronting Direct Reports",
        descriptionFr: "Faire face aux problèmes de performance de ses collaborateurs directs",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Creativity",
        descriptionFr: "Faire preuve de créativité",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Customer Focus",
        descriptionFr: "Être orienté vers le client",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Timely Decision Making",
        descriptionFr: "Prendre des décisions au bon moment",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Decision Quality",
        descriptionFr: "Prendre des décisions de qualité",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Delegation",
        descriptionFr: "Savoir déléguer",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Developing Direct Reports with Others",
        descriptionFr: "Développer les compétences de ses",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "",
        descriptionFr: "collaborateurs directs et des autres",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Directing Others",
        descriptionFr: "Savoir diriger",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Managing Diversity",
        descriptionFr: "Gérer la diversité",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Ethics and Values",
        descriptionFr: "Respecter l’éthique et les valeurs",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Fairness to Direct Reports",
        descriptionFr: "Être équitable envers ses collaborateurs directs",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Functional/Technical Skills",
        descriptionFr: "Posséder des aptitudes techniques et fonctionnelles",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Hiring and Staffing",
        descriptionFr: "Savoir recruter et bien s’entourer",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Informing",
        descriptionFr: "Savoir informer",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Innovation Management",
        descriptionFr: "Gérer l’innovation",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Integrity and Trust",
        descriptionFr: "Être intègre et digne de confiance",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Intellectual Horsepower",
        descriptionFr: "Avoir de très bonnes capacités intellectuelles",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Interpersonal Savvy",
        descriptionFr: "Être doué pour la communication interpersonnelle",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Learning on the Fly",
        descriptionFr: "Avoir la capacité à apprendre dans l’action",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Listening",
        descriptionFr: "Savoir écouter",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Managerial Courage",
        descriptionFr: "Faire preuve de « courage managérial »",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Managing and Measuring Work",
        descriptionFr: "Savoir gérer et établir des indicateurs de performance",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Motivating Others",
        descriptionFr: "Savoir motiver",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Negotiating",
        descriptionFr: "Savoir négocier",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Organizational Agility",
        descriptionFr: "Faire preuve d’agilité organisationnelle",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Organizing",
        descriptionFr: "Savoir organiser",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Dealing with Paradox",
        descriptionFr: "Savoir gérer les paradoxes",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Patience",
        descriptionFr: "Être patient",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Peer Relationships",
        descriptionFr: "Entretenir de bonnes relations avec ses collègues",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Perseverance",
        descriptionFr: "Faire preuve de persévérance",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Personal Disclosure",
        descriptionFr: "Être transparent",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Personal Learning",
        descriptionFr: "Savoir apprendre de ses expériences",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Perspective",
        descriptionFr: "Faire preuve de perspective",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Planning",
        descriptionFr: "Savoir planifier",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Political Savvy",
        descriptionFr: "Avoir un bon sens politique",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Presentation Skills",
        descriptionFr: "Maîtriser la communication orale",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Problem Solving",
        descriptionFr: "Maîtriser la résolution de problèmes",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Process Management",
        descriptionFr: "Maîtriser la gestion des processus",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Drive for Results",
        descriptionFr: "Être orienté vers les résultats",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Self-Development",
        descriptionFr: "Être capable d’auto- développement",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Self-Knowledge",
        descriptionFr: "Bien se connaître",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Sizing Up People",
        descriptionFr: "Savoir juger les autres",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Standing Alone",
        descriptionFr: "Faire preuve d’autonomie",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Managing Through Systems",
        descriptionFr: "Savoir gérer en utilisant le système",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Building Effective Teams",
        descriptionFr: "Savoir constituer des équipes performantes",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Technical Learning",
        descriptionFr: "Avoir la capacité de se former aux aspects techniques",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Time Management",
        descriptionFr: "Savoir gérer son temps",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Total Work Systems",
        descriptionFr: "Systèmes de gestion intégrale",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Understanding Others",
        descriptionFr: "Comprendre les autres",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Managing Vision and Purpose",
        descriptionFr: "Savoir communiquer la vision et les buts de l’organisation",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      },
      {
        descriptionEn: "Written Communications",
        descriptionFr: "Maîtriser la communication écrite",
        type: "competency",
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 22
      }
     ],
    {}
  );

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete("skills", null, {});
  }
};
