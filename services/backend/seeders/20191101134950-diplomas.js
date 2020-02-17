"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "diplomas",
      [
        {
          descriptionEn: "Master of Science - Agri. Econ",
          descriptionFr: "Maîtrise en Science-Agri. Econ",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in International Trade",
          descriptionFr: "Diplôme commerce international",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Applied Arts",
          descriptionFr: "Diplôme en arts appliquées",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Science-Specialist",
          descriptionFr: "Bacc. en Sc. - (spécialiste)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Applied GIS",
          descriptionFr: "Bacc. en sys. info. géographiq",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Advertising Arts",
          descriptionFr: "Diplôme en art publicitaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Agro-economics",
          descriptionFr: "Bacc. en agro-écomomie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Rural Economy",
          descriptionFr: "Maîtr. en économie rurale",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Science -Rural Studi",
          descriptionFr: "Maîtr. science-études rurales",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Science -Int.Develop",
          descriptionFr: "Maîtr. science - dév. internat",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachlor of Arts -Int.Develop",
          descriptionFr: "Bacc. en études dév. internati",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Comp. Science",
          descriptionFr: "Diplôme en informatique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Library & Info.Tech",
          descriptionFr: "Dip en bibliothécono&tech info",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Criminology",
          descriptionFr: "Diplôme en criminologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Science (Honours)",
          descriptionFr: "Bacc en science - mention",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Systems Support",
          descriptionFr: "Diplôme en soutien informatiqu",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Agriculture",
          descriptionFr: "Diplôme en agriculture",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Science - Neurology",
          descriptionFr: "Maîtrise en science-neurologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Science - Biology",
          descriptionFr: "Maîtr. en science - biologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diplôme- 2 cycle-adminstration",
          descriptionFr: "Diplôme- 2 cycle-adminstration",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Food Science & Techno",
          descriptionFr: "Bacc.en sc.techno.des aliments",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Dip.communicat.engineer. techn",
          descriptionFr: "Dip.technologie comm.ingénieri",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Dip.inform.systems.technology",
          descriptionFr: "Dip.techn.syst.d`information",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "master sc.geog.information sys",
          descriptionFr: "Maîtrise sc.sys.inform.géog.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "administrative assist diploma",
          descriptionFr: "Diplôme adjoint administratif",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor, commun. human relat.",
          descriptionFr: "Bacc.commun.relation.humaine",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Dip.Medical Laboratory Techn.",
          descriptionFr: "Dip.en technologie médical",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor agriculture economics",
          descriptionFr: "Doctorat en économie agricole",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "TESOL diploma",
          descriptionFr: "TESOL diplôme",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Horticulture",
          descriptionFr: "Diplôme de l'Horticulture",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Dip.Applied Science Technology",
          descriptionFr: "Dip tech sciences appliquées",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master in Agroforestry",
          descriptionFr: "Maîtr. en agroforesterie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Dip. Computer Sup. Spec. & IT",
          descriptionFr: "Dip. Spéc. soutien info et TI",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Entomology",
          descriptionFr: "Médecin de l'entomologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Financial Assistant Diploma",
          descriptionFr: "Diplôme d'assistant financier",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Honours Diploma",
          descriptionFr: "Diplôme d'honneur",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science Microbiology",
          descriptionFr: "Bac. en science microbiologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Economics",
          descriptionFr: "Bacc. en économie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Dip. Intl Development -2 cycle",
          descriptionFr: "Dip. dévelop. intl - 2 cycle",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "College Stenography Certificat",
          descriptionFr: "Certificat collégial sténo.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Associate in",
          descriptionFr: "Brevet en",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Associate of Arts",
          descriptionFr: "Associé en arts",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Associate of Applied Science",
          descriptionFr: "Associé en sciences appliquées",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Associate of Business Admin",
          descriptionFr: "Associé en admin des affaires",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Advanced Diploma-VetTechnology",
          descriptionFr: "Dipl. Avancé-Tech. Vétérinaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Associate of Engineering",
          descriptionFr: "Associé en ingénierie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Associate of Science",
          descriptionFr: "Brevet en sciences",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Arts",
          descriptionFr: "Baccalauréat ès arts",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Applied Arts",
          descriptionFr: "Baccalauréat arts industriels",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Accounting",
          descriptionFr: "Baccalauréat en comptabillité",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Appl ConservationEnfc",
          descriptionFr: "Bachelor Appl Conservation Enf",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Arts Community",
          descriptionFr: "B.A. en études communautaires",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Dramatic Arts",
          descriptionFr: "Baccalauréat en art dramatique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Administration",
          descriptionFr: "Baccalauréat en administration",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Arts (Honours)",
          descriptionFr: "Baccalauréat spécialisé",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Appl Justice Studies",
          descriptionFr: "Bacc. études de justice appl.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Applied Management",
          descriptionFr: "Bacc. en gestion appliquée",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Arts-Recreation Ad",
          descriptionFr: "B.A. administr. des loisirs",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Architecture",
          descriptionFr: "Baccalauréat en architecture",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Arts and Science",
          descriptionFr: "Bacc. ès arts et sciences",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Applied Science",
          descriptionFr: "Bac. sciences appliqués",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Military Arts/Science",
          descriptionFr: "Bacc. arts/sciences militaires",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Arts - Sociology",
          descriptionFr: "B.A. en sociologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Admin Studies",
          descriptionFr: "Bacc. études administratives",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Visual Arts",
          descriptionFr: "Baccalauréat arts visuels",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Business Admin",
          descriptionFr: "Bac. admistration commerciale",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Business Economics",
          descriptionFr: "Bacc. en économie d'entreprise",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Business Management",
          descriptionFr: "Bacc. en admin. des affaires",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Biblical Studies",
          descriptionFr: "Bacc. en études bibliques",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor - Christian Education",
          descriptionFr: "Bacc. en éducation chr.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of commerce (Honours)",
          descriptionFr: "Bacc. spécialisé en commerce",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Computer Info Syst",
          descriptionFr: "B. en syst. d'inf. sur ord.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Civil Law",
          descriptionFr: "Baccalauréat en droit civil",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Commerce",
          descriptionFr: "Baccalauréat en commerce",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Community Rehab",
          descriptionFr: "Bacc. en relèvement des comm.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Criminology",
          descriptionFr: "Baccalauréat en criminologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Computer Science",
          descriptionFr: "Baccalauréat en informatique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Design",
          descriptionFr: "Baccalauréat en design",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Dental Science",
          descriptionFr: "Baccalauréat en odontologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Engineering",
          descriptionFr: "Baccalauréat en génie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Education afterDegree",
          descriptionFr: "Bacc. en éducation après dipl.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Education",
          descriptionFr: "Baccalauréat en éducation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Environmental Design",
          descriptionFr: "Bacc. conception de l'envir.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Engineering and Mngt",
          descriptionFr: "Bacc. en génie et gestion",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Engineer and Society",
          descriptionFr: "Bacc. en génie et société",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Physical Ed-Health",
          descriptionFr: "Bacc. éd. physique et santé",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Environmental Studies",
          descriptionFr: "Bacc. études environnement.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Engineering Science",
          descriptionFr: "Baccalauréat en génie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Exercise, Sport Scien",
          descriptionFr: "Bacc. exerc./science du sport",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Fine Arts",
          descriptionFr: "Baccalauréat en beaux-arts",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Science Forestry",
          descriptionFr: "Bac. sciences forestières",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Food Science",
          descriptionFr: "B. ès sciences (nutrition)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of General Studies",
          descriptionFr: "Bacc. en études générales",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Home Economics",
          descriptionFr: "Bacc. sciences domestiques",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Human Ecology",
          descriptionFr: "Bacc. en écologie humaine",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Human Justice",
          descriptionFr: "Bacc. en justice humaine",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Human Kinetics",
          descriptionFr: "Bacc. sc. de l'activité phys.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Human Resources Devel",
          descriptionFr: "Bacc. dév. ress. humaines",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Hotel, Resort Mgmt",
          descriptionFr: "Bacc. en gestion hôtelière",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Health Science",
          descriptionFr: "Bacc. sciences de la santé",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Health Science OT",
          descriptionFr: "Bacc. sciences de la santé TO",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Health Science PT",
          descriptionFr: "Bacc. sciences de la santé PHY",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor - Applied Informatics",
          descriptionFr: "Bacc. informatique appliquée",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor InternationalBusiness",
          descriptionFr: "Bacc. commerce international",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Industrial Design",
          descriptionFr: "Bacc. en design industriel",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Interior Design",
          descriptionFr: "Bacc. en design d'intérieur",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Integrated Studies",
          descriptionFr: "Bacc. en études intégrées",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Independent Studies",
          descriptionFr: "Bacc. en études indépendantes",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Indian Social Work",
          descriptionFr: "Bacc. service social Autoch.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Information Systems",
          descriptionFr: "Bacc. systèmes d'information",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Journalism",
          descriptionFr: "Baccalauréat en journalisme",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Kinesiology",
          descriptionFr: "Bacc. en cinésiologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Laws B.L.(L.)",
          descriptionFr: "Baccalauréat en droit B.L.(L.)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Laboratory Technology",
          descriptionFr: "Bacc. techn. de laboratoire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Leisure",
          descriptionFr: "Baccalauréat en loisirs",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Library Science",
          descriptionFr: "Baccalauréat bibliothéconomie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Musical Arts",
          descriptionFr: "Baccalauréat en musique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Math",
          descriptionFr: "Baccalauréat en mathématiques",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Medicine",
          descriptionFr: "Baccalauréat en médecine",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Management",
          descriptionFr: "Baccalauréat en gestion",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Med Lab Science",
          descriptionFr: "Bacc. sciences de laboratoire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Medical Rehab (OT)",
          descriptionFr: "Bacc. réadaptation médicale TO",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Medical Rehab (PT)",
          descriptionFr: "Bacc. réadaptation médic. PHY",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Maritime Studies",
          descriptionFr: "Bacc. études sur les Maritimes",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Medical Science",
          descriptionFr: "Bacc. en sciences médicales",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Music Therapy",
          descriptionFr: "Bacc. en musicothérapie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Music",
          descriptionFr: "Baccalauréat en musique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Music Education",
          descriptionFr: "Bacc. éducation musicale",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Nursing Degree",
          descriptionFr: "Bacc. en sciences infirmières",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Nursing (RN)",
          descriptionFr: "Bacc. sc. infirmières (inf.)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Natural Resource Sci",
          descriptionFr: "Bacc. ressources naturelles",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Nursing Science",
          descriptionFr: "Bacc. sciences infirmières",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Office Management",
          descriptionFr: "Bacc. organisation des bureaux",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Outdoor Recreation",
          descriptionFr: "Bacc. loisir de plein air",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Occupational Thera",
          descriptionFr: "Baccalauréat en ergothérapie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Public Administration",
          descriptionFr: "Bacc. en admin. publique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Professional Arts",
          descriptionFr: "Bacc. arts de la scène",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Physical Activity St.",
          descriptionFr: "Bacc. études activité physique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Physical Education",
          descriptionFr: "Bacc. en éducation physique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Philosophy",
          descriptionFr: "Baccalauréat en philosophie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Pharmacy",
          descriptionFr: "Baccalauréat en pharmacie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Physical, Health Educ",
          descriptionFr: "Bacc. éduc. phys. et sanitaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Public Relations",
          descriptionFr: "Bacc. en relations publiques",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Psychology",
          descriptionFr: "Baccalauréat en psychologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Physical Therapy",
          descriptionFr: "Bacc. en physiothérapie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Religious Studies",
          descriptionFr: "Bacc. en sciences religieuses",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Recreation",
          descriptionFr: "Bacc. en loisirs",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Recreation, Leisure",
          descriptionFr: "Bacc. en loisirs",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Recreation Management",
          descriptionFr: "Bacc. gestion des loisirs",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Recreation Studies",
          descriptionFr: "Bacc. en sciences du loisir",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Science",
          descriptionFr: "Baccalauréat en science",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Agriculture",
          descriptionFr: "Bacc. ès sciences agricoles",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor ScienceAdministration",
          descriptionFr: "Bacc. ès sciences admin.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Agric Eng",
          descriptionFr: "B.Sc. en génie agricole",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Physical Ac",
          descriptionFr: "B.Sc. en activité physique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science -Architecture",
          descriptionFr: "B.Sc. en architecture",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Dentistry",
          descriptionFr: "B.Sc. en art dentaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Engineering",
          descriptionFr: "B.Sc. en ingénierie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Environment",
          descriptionFr: "B.Sc. en environnement",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Forest Eng.",
          descriptionFr: "B.Sc. en génie forestier",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Food Scienc",
          descriptionFr: "B.Sc. en science alimentaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Human Ecolo",
          descriptionFr: "B.Sc. en écologie humaine",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Health Educ",
          descriptionFr: "B.Sc. en éducation sanitaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Human Nutri",
          descriptionFr: "B.Sc. en nutrition humaine",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Kinesiology",
          descriptionFr: "B.Sc. en cinésiologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Medicine",
          descriptionFr: "B.Sc. en médecine",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Mental Heal",
          descriptionFr: "B.Sc. en santé mentale",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Nursing",
          descriptionFr: "B. en sciences infirmières",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Nutrition",
          descriptionFr: "B.Sc. en nutirtion",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Occupation",
          descriptionFr: "B.Sc. en ergothérapie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Psychiatric",
          descriptionFr: "B.Sc. en nursing psychiatrique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science-Physical Ther",
          descriptionFr: "B.Sc. en physiothérapie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science-Physiotherapy",
          descriptionFr: "B.Sc. en physiothérapie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Radiation",
          descriptionFr: "B.Sc. en radiation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science-Computer Scie",
          descriptionFr: "B.Sc. en informatique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Education",
          descriptionFr: "Bacc. sciences de l'éducation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Sci. Foreign Service",
          descriptionFr: "B.Sc. (Service à l'étranger)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Genetics",
          descriptionFr: "B.Sc. en génétique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Home Econom",
          descriptionFr: "B.Sc. en économie domestique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Science (Honours)",
          descriptionFr: "Bacc. és Sciences (Spécialisé)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Science - Law",
          descriptionFr: "B.Sc. en droit",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Languages",
          descriptionFr: "B.Sc. en langues",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Management",
          descriptionFr: "B.Sc. en gestion",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Nutritional",
          descriptionFr: "B.Sc. en nutrition",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Specialization",
          descriptionFr: "Baccalauréat spécialisé",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Special Education",
          descriptionFr: "Bacc. en éducation spécialisée",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Pharmacy",
          descriptionFr: "B.Sc. en pharmacie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Social Sciences",
          descriptionFr: "Baccalauréat sciences sociales",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Social Service",
          descriptionFr: "Baccalauréat en service social",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Science - Technology",
          descriptionFr: "B.Sc. en technologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Social Work",
          descriptionFr: "Baccalauréat en service social",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Theology",
          descriptionFr: "Baccalauréat en théologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Teaching",
          descriptionFr: "Baccalauréat en enseignement",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Tourism, Hospitality",
          descriptionFr: "Bacc. tourisme/adm. hosp.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Technology Informatio",
          descriptionFr: "Bacc. en infor. technologique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Technology Management",
          descriptionFr: "Bacc. gestion de la technol.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Translation",
          descriptionFr: "Baccalauréat en traduction",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Technology",
          descriptionFr: "Bacc. en technologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Veterinary Medicine",
          descriptionFr: "Bacc. médecine vétérinaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor Vocational Education",
          descriptionFr: "Bacc. en formation profess.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Chartered Accountant",
          descriptionFr: "Comptable agréé",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "College Education Certificate",
          descriptionFr: "Certificat d'études collégiale",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Undergraduate Certificate",
          descriptionFr: "Certificat de premier cycle",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Certif in Political Studies",
          descriptionFr: "Certificat d'études politiques",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Certificate",
          descriptionFr: "Certificat",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Certificat Program",
          descriptionFr: "Programme de certificat",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Certified General Accountant",
          descriptionFr: "Comptable général licencié",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "4-Yr College Applied Degree",
          descriptionFr: "Dipl collégial appl 4 ans",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Certif Management Accountant",
          descriptionFr: "Comptable en gestion accrédité",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Admin. Assistant",
          descriptionFr: "Diplôme d'Admin. Assistant",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Administration",
          descriptionFr: "Doctorat en administration",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Architecture",
          descriptionFr: "Doctorat en architecture",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Business Admin",
          descriptionFr: "Doctorat admin. commerciale",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Business",
          descriptionFr: "Diplôme en études commerciales",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor in Chiropractic",
          descriptionFr: "Doctorat en chiropraxie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor in Civil Law",
          descriptionFr: "Doctorat en droit civil",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor in Canon Law",
          descriptionFr: "Doctorat en droit canon",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma Notary Science",
          descriptionFr: "Diplôme de droit notarial",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor in Dental Surgery",
          descriptionFr: "Doctorat en chirurgie dentaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Advanced Studies",
          descriptionFr: "Diplome d'études avancées",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "College Education Diploma",
          descriptionFr: "Diplôme des études collégiales",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Engineering",
          descriptionFr: "Diplôme en ingénierie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Social Studies",
          descriptionFr: "Diplôme des études sociales",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Health Science",
          descriptionFr: "Doct. en sciences de la santé",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma",
          descriptionFr: "Diplôme",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Business Admin",
          descriptionFr: "Diplôme admin commerciale",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma of Comp. Eng. Tech.",
          descriptionFr: "Diplôme en Tech. du Génie Info",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Graduate Diploma",
          descriptionFr: "Diplôme d'études supérieures",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Undergraduate Diploma",
          descriptionFr: "Diplôme de premier cycle",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Jurisprudence",
          descriptionFr: "Doct. en sciences juridiques",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Dental Medicine",
          descriptionFr: "Doctorat en médecine dentaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Ministry",
          descriptionFr: "Doct. en pastorale sacerdotale",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Musical Arts",
          descriptionFr: "Doctorat en musique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Music",
          descriptionFr: "Doctorat en musique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Arts",
          descriptionFr: "Doctorat ès arts",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Diploma in Public Admin",
          descriptionFr: "Diplôme admin. publique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Psychology",
          descriptionFr: "Doctorat en psychologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Social Science",
          descriptionFr: "Doctorat en sciences sociales",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Social Work",
          descriptionFr: "Doctorat en service social",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Theology",
          descriptionFr: "Doctorat en théologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Veterinary Medicine",
          descriptionFr: "Doct. en médecine vétérinaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Veterinary Science",
          descriptionFr: "Doct. en médecine vétérinaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Education",
          descriptionFr: "Doctorat en éducation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Exec Master of Business Admin",
          descriptionFr: "Maîtr. admin. gens d'affaires",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Foreign Studies/Education",
          descriptionFr: "Études étrangères/éducation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "High School Graduate",
          descriptionFr: "Diplômé du secondaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "High School One Year",
          descriptionFr: "Secondaire un",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "High School Two Years",
          descriptionFr: "Secondaire deux",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "High School Three Years",
          descriptionFr: "Secondaire trois",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "High School Four Years",
          descriptionFr: "Secondaire quatre",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "High School Five Years",
          descriptionFr: "Secondaire cinq",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Internat. Master Business Admi",
          descriptionFr: "Maîtr. administration intern.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Juris Doctor",
          descriptionFr: "Doctor juris",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor in the Science of Law",
          descriptionFr: "Doct. en sciences juridiques",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Licentiate in Canon Law",
          descriptionFr: "Licence en droit canonique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Licencié ès lettres",
          descriptionFr: "Licencié ès lettres",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Licentiate",
          descriptionFr: "Licence",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Bachelor of Laws LL.B.",
          descriptionFr: "Baccalauréat en droit LL.B.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Doctor of Laws",
          descriptionFr: "Docteur en droit",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Licentiate of Laws",
          descriptionFr: "Licencié en droit",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Laws",
          descriptionFr: "Maîtrise en droit",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Licentiate in Music",
          descriptionFr: "Licence en musique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Licentiate in Philosophy",
          descriptionFr: "Licence en philosophie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Licentiate in Theology",
          descriptionFr: "Licence en théologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Art Conservation",
          descriptionFr: "Maîtr. conserv. oeuvres d'art",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Accounting",
          descriptionFr: "Maîtrise en comptabilité",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Arts - Canon Law",
          descriptionFr: "Maîtr. ès arts en droit canon",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Arts",
          descriptionFr: "Maîtrise en arts",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Adult Education",
          descriptionFr: "Maîtr en éducation des adultes",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Administration",
          descriptionFr: "Maîtrise en administration",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Arts - Education",
          descriptionFr: "Maîtrise ès arts en éducation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master Applied Environmental",
          descriptionFr: "Maîtr. en études environnem.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Agriculture",
          descriptionFr: "Maîtrise en agriculture",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Arts - Human Ecology",
          descriptionFr: "M.A. en écologie humaine",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Arts in Leadership",
          descriptionFr: "Master of Arts in Leadership",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master Arts - Liberal Studies",
          descriptionFr: "M.A. en sciences libérales",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Arts - Missiology",
          descriptionFr: "M.A. en missiologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master Arts - Pastoral Studies",
          descriptionFr: "M.A. en études pastorales",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Arts - Political Sc.",
          descriptionFr: "M.A. en science politique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Arts - Psychology",
          descriptionFr: "M.A. en psychologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Architecture",
          descriptionFr: "Maîtrise en architecture",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Admin Science",
          descriptionFr: "Maîtrise en science admin.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master Advance Studies Archite",
          descriptionFr: "Maîtr. ét. sup. en archit.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Applied Science",
          descriptionFr: "M. sciences appliquées",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master Arts - Pastoral Science",
          descriptionFr: "Maîtrise ès arts en pastorale",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Applied Statistics",
          descriptionFr: "Maîtr. en statist. appliquées",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master Advanced Lan Architect",
          descriptionFr: "Maîtr. ét. sup. arch. RL",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master Arts-School Psychology",
          descriptionFr: "M.A. en psychologie scolaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Archival Studies",
          descriptionFr: "Maîtrise en archivistique",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Arts - Teaching",
          descriptionFr: "M.A. en enseignement",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master land use pl./develop.",
          descriptionFr: "Maîtr. amén. territoire/dével.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Arts - Theology",
          descriptionFr: "Maîtrise ès arts en théologie",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Arts War Studies",
          descriptionFr: "MA-Ét. conduite de la guerre",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Business Admin",
          descriptionFr: "Maîtrise en admin commerciale",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master Library & Info Science",
          descriptionFr: "Maîtr. biblioth./sc. infor.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master Criminology (Applied)",
          descriptionFr: "Maîtrise en criminologie appl.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Civil Engineering",
          descriptionFr: "Maîtrise en génie civil",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master Continuing Education",
          descriptionFr: "Maîtrise en formation continue",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Counselling",
          descriptionFr: "Maîtrise en counseling",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          descriptionEn: "Master of Clinical Dentistry",
          descriptionFr: "Maîtr. en dentisterie clinique",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
    // .then(() => {
    //   return queryInterface.bulkInsert(
    //     "diplomas",
    //     [
    //       {
    //         id: "bbd95b12-ffe4-11e9-8d71-362b9e155667",
    //         descriptionEn: "Master of Counselling",
    //         descriptionFr: "Maîtrise en counseling",
    //         createdAt: new Date(),
    //         updatedAt: new Date()
    //       },
    //       {
    //         id: "06688220-ffe5-11e9-8d71-362b9e155667",
    //         descriptionEn: "Master of Arts War Studies",
    //         descriptionFr: "MA-Ét. conduite de la guerre",
    //         createdAt: new Date(),
    //         updatedAt: new Date()
    //       }
    //     ],
    //     {}
    //   );
    // });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete("diplomas", null, {});
  }
};
