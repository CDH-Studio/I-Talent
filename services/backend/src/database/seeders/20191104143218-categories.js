module.exports = {
  up: (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      // seeder for categories table.. required in this same file to be able to use the ids for foreign key in skills table
      "categories",
      [
        {
          descriptionEn: "Administration",
          descriptionFr: "Administration",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Audit and Evaluation",
          descriptionFr: "Vérification et évaluation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Collaboration",
          descriptionFr: "Collaboration",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Finance",
          descriptionFr: "Finances",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Emergency Management",
          descriptionFr: "Gestion des urgences",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Communications",
          descriptionFr: "Communications",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Data Science",
          descriptionFr: "Science des données",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Digital",
          descriptionFr: "Numérique",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Human Resources",
          descriptionFr: "Ressources humaines",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Innovation",
          descriptionFr: "Innovation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Information Management",
          descriptionFr: "Gestion de l’information",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Diversity and Inclusion",
          descriptionFr: "Diversité et inclusion",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Management",
          descriptionFr: "Gestion ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Learning Delivery",
          descriptionFr: "Prestation de l’apprentissage",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Policy",
          descriptionFr: "Politiques",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Specializations",
          descriptionFr: "Spécialisations",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Procurement",
          descriptionFr: "Approvisionnement",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "International Affairs",
          descriptionFr: "Affaires internationales",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Learning Design",
          descriptionFr: "Conception de l’apprentissage",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "General",
          descriptionFr: "Compétences générales",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Programming Languages/Scripting Languages",
          descriptionFr:
            "Langages de programmation / Langages d’écriture de scripts",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          descriptionEn: "Competency",
          descriptionFr: "Compétences",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete("categories", null, {});
  },
};
