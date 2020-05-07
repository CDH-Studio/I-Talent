"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "schools",
      [
        {
          country: "CAN",
          state: "NS",
          description: "High School - All",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Acadia University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Cape Breton, Univ. College of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Sainte-Anne, Université",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Dalhousie University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NL",
          description: "Memorial Univ of Newfoundland",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NB",
          description: "Moncton, Université de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NB",
          description: "Mount Allison, University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Mount Saint Vincent University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Nova Scotia College Art/Design",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Saint Francis Xavier U.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NB",
          description: "Saint-Louis Maillet (M. U. C.)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NB",
          description: "Shippagan (Moncton U. Campus)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Saint Mary's University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Nova Scotia, Technical Univ",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NB",
          description: "New Brunswick, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NB",
          description: "Saint John Campus, U.N.B.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "PE",
          description: "Prince Edward Island, Univ",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NB",
          description: "Saint Thomas University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Atlantic School of Theology",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Bishop's University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Sir George Williams University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Concordia University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "King's College, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "École de Hautes études comm",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Éc.nat.admin. publ.-Chicoutimi",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Éc.nat. admin. publ. - Hull",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Éc.nat. admin. publ.- Montréal",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Éc.nat. admin. publ. - Québec",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "École Polytechnique - Montréal",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "École - technologie supérieure",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Laval, Université",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "MacDonald Campus (McGill U.)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "McGill, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Montréal, Université de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Sherbrooke, Université de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Québec Univ, Chicoutimi",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Québec, Univ. - Outaouais",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Québec Univ., Montréal",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Québec Univ., Rimouski",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Québec Univ, Rouyn",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Québec Univ, Trois-Rivières",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "PE",
          description: "Atlantic Veterinary College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Saint-Paul University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Algoma University College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Brock University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Carleton University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Guelph, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Hearst - Collège universitaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Lakehead University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Laurentian University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "McMaster University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Nipissing University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Ottawa, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Queen's University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Royal Military College Canada",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Ryerson University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Toronto, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Trent University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Waterloo, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Western Ontario, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Wilfrid Laurier University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Windsor, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "York University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Sudbury, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "MB",
          description: "Brandon University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "MB",
          description: "Saint-Boniface, Col. univ.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "MB",
          description: "Manitoba, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "MB",
          description: "Winnipeg, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NB",
          description: "Atlantic Baptist Col. Moncton",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "Regina, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "Saskatchewan, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "Sask. Indian Federated Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Alberta, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Athabasca University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Calgary, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Lethbridge, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Notre-Dame U. Nelson B.C.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "British Columbia,University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Simon Fraser University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Victoria, University of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Royal Roads Military College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Trinity Western University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Northern British Columbia U.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Royal Roads University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "(blank)",
          description: "Other Canadian University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "(blank)",
          description: "University Outside Canada",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Canadian Coast Guard College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NL",
          description: "Fisheries & Marine Inst.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NL",
          description: "College of the North Atlantic",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "PE",
          description: "Holland College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NB",
          description: "Maritime Forest Ranger School",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NB",
          description: "Community Colleges - Bathurst",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Nova Scotia Agricultural Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Institute of Technology Campus",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Nova Scotia Survey Institute",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Nova Scotia Teachers College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "PE",
          description: "Atlantic Veterinary Col. (PEI)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Annapolis Campus, NS Cmnty Col",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Burridge Campus-Yarmouth",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Cape Breton Adult Vocat'l Trng",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Geogr. Sci. Col.-Lawrencetown",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Cumberland Campus,NS Cmnty Col",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Dartmouth Adult Vocat'l Trng",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Halifax Campus, NS Cmnty Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Hants Campus, NS Cmnty Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "I.W. Akerley Campus-Dartmouth",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Lunenberg Campus-Bridgewater",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Nautical Inst. Campus, NS C.C.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Pictou Campus, NS Cmnty Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Schelburne Campus,NS Cmnty Col",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Strait Campus, NS Cmnty Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Sydney Campus-Sydney",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Cobetc-Truro",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Kingstec-Kentville",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Memorial Composite-SydneyMines",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Truro Campus (Community Col.)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NS",
          description: "Colchester Campus",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NL",
          description: "Eastern Cmnt Col.(Clarenville)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NL",
          description: "Westviking Col. (Stephenville)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NL",
          description: "Labrador College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "NL",
          description: "Central Applied Arts,Tech&C.Ed",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Baie-Comeau, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Côte-Nord (Hauterive), Col. de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Côte-Nord(Manicouagan),Col. de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Côte-Nord (Mingan), Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Sept-Îles, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "François-Xavier-Garneau, Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Gaspésie et des Îles, Col. de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Institut maritime du Québec",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Pocatière, Collège de la",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Inst. tech. agro-ali Pocatière",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Lévis-Lauzon, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Limoilou, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Matane, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Rimouski, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Rivière-du Loup, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Sainte-Foy, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Alma, Collège d'",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Chicoutimi, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Jonquière, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Saint-Félicien, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Shawinigan, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Lauzon, Col. de Technologie de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Région Amiante(Thetford Mines)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Trois-Rivières, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Victoriaville, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Ahuntsic, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "André Laurendeau, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Bois-de-Boulogne, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Drummonville, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Saint-Hyacinthe, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Tracy-Sorel, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Champlain Col. - Lennoxville",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Champlain Col. - St-Lambert",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Champlain Col. - St-Lawrence",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Granby-Haute-Yamaska, Col. de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Private colleges",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Dawson College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Édouard-Montpetit, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Outaouais, Collège de l'",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Maisonneuve, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "John Abbott College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Joliette-De Lanaudière, Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Lionel-Groulx, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Montmorency, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Rosemont, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Abitibi-Témiscamingue, Col. de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Inst.Tech.Agro-ali StHyacinthe",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Saint-Jean-Sur-Richelieu, Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Saint-Jérôme, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Saint-Laurent, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Valleyfield, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Sherbrooke, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Tracy, Col. de Technologie de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Inst. tourisme/d'hôtellerie QC",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Vanier College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Vieux-Montréal, Collège du",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Académie Centenniale",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "André-Grasset, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Bart, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Beauce-Appalaches, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Notre-Dame-de-Foy Campus",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Centre spécialisé pêche (G-R)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Affaires Ellis Inc.,Collège d'",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Lévis, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Secrétariat Notre-Dame, Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Français, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Militaire royal St-Jean, Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Conserv. de musique Chicoutimi",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Conserv. de musique de Hull",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Conserv. de musique Montréal",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Conserv. de musique de Québec",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Conserv. de musique Rimouski",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Conserv. de musique Trois-Riv.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Conserv. de musique Val-d'or",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Conservatoire Lasalle",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Commerciale du Cap, École",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Vincent-d'Indy, École",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Heritage College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Institut Teccart",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Jean-de-Brébeuf, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "L'Assomption, Collège de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Laflèche, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "LaSalle, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Macdonald Campus (McGill)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Marianopolis College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Marie-Victorin, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Mérici, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Moderne 3-R, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "O'Sullivan de Montréal, Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "O'Sullivan de Québec, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Petit Séminaire de Québec",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Sherbrooke, Séminaire de",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Saint-Augustin, Séminaire",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Villa Sainte-Marcelline",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "QC",
          description: "Québec UNIV, téléuniversité",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Algoma College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Algonquin College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Cambrian College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Canadore College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Centennial College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Centralia Col. Agricul. Tech.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Conestoga Applied Arts & Tech.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "ConfederationApplied Arts&Tech",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Durham Col. Applied Arts&Tech.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Fanshawe Applied Arts & Tech.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "George Brown Applied Arts&Tech",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Georgian Applied Arts & Tech.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Humber Col. Applied Arts &Tech",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Kemptville Col. Agricult. Tech",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Lakehead College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Lambton College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Loyalist College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Mohawk College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "New Liskeard Col. Agricul.Tech",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Niagara College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Nipissing College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Northern College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Ontario College of Arts",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Ridgetown Col. Agricul. Tech.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Ryerson College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Saint Clair College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Saint Lawrence College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Sault Col. Applied Arts & Tech",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Seneca College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Sheridan College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Sir Sanford Fleming Arts &Tech",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "La Cité collégiale",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Redeemer Reformed ChristianCol",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "Boréal, Collège",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "ON",
          description: "U of Ont. Inst. of Tech.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "MB",
          description: "Assiniboine Community College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "MB",
          description: "Keewatin Community College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "(blank)",
          description: "Red River Community College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "SK Institute Applied Arts &Sci",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "Saskatchewan Technological Ins",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "Carlton Trail Regional College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "Cumberland Regional College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "Cypress Hills Regional College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "Northlands College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "North West Regional College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "Parkland Regional College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "Prairie West Regional College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "Saskatchewan Indian Tech Inst.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "SK Inst. Applied Science &Tech",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "SK Ed. Trng & Empl. NorthernEd",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "SK Ed. Trng & Empl. Reg'l Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "South East Regional College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "Pallister Institute (SIAST)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "SK",
          description: "Woodland Institute",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Camrose College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Concordia College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Fairview College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Grand Prairie Regional College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Grant MacEwan University",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Lethbridge Community College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Medicine Hat College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Mount Royal College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Northern Alberta Inst. of Tech",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Old Sun Community College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Red Deer College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Southern Alberta Inst. of Tech",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Vermilion Campus (LakelandCol)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Alberta Vocational College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Augustana University College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Keyano College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "AB",
          description: "Lakeland College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "British Columbia Inst. of Tech",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "British Columbia Mining Col.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Kamloops College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Camosun College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Capilano College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Cariboo, University College of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Columbia College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Douglas College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Kwantlen Polytechnic Uni.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "Malaspina College",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "New Caledonia, College of",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country: "CAN",
          state: "BC",
          description: "New Caledonia, College of",
          createdAt: new Date(),
          updatedAt: new Date()
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
    return queryInterface.bulkDelete("schools", null, {});
  }
};
