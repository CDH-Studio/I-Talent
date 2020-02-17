"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "locations",
      [
        {
          addressEn: "191 University Ave",
          addressFr: "191 av University",
          city: "Charlottetown",
          provinceEn: "Prince Edward Island",
          provinceFr: "Île-du-Prince-Édouard",
          country: "Canada",
          postalCode: "C1A 4L2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "50 Brown Ave",
          addressFr: "50 av Brown",
          city: "Dartmouth",
          provinceEn: "Nova Scotia",
          provinceFr: "Nouvelle-Écosse",
          country: "Canada",
          postalCode: "B3B 1X8",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "1344 Summer St",
          addressFr: "1344 rue Summer",
          city: "Halifax",
          provinceEn: "Nova Scotia",
          provinceFr: "Nouvelle-Écosse",
          country: "Canada",
          postalCode: "B3H 0A8",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "1505 Barrington St",
          addressFr: "1505 rue Barrington",
          city: "Halifax",
          provinceEn: "Nova Scotia",
          provinceFr: "Nouvelle-Écosse",
          country: "Canada",
          postalCode: "B3J 3K5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "1045 Main St",
          addressFr: "1045 rue Main",
          city: "Moncton",
          provinceEn: "New Brunswick",
          provinceFr: "Nouveau-Brunswick",
          country: "Canada",
          postalCode: "E1C 1H1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "189 Prince William St",
          addressFr: "189 rue Prince-William",
          city: "Saint John",
          provinceEn: "New Brunswick",
          provinceFr: "Nouveau-Brunswick",
          country: "Canada",
          postalCode: "E2L 2B9",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "10 Barters Hill",
          addressFr: "10 Barters Hill",
          city: "St Johns",
          provinceEn: "Newfoundland and Labrador",
          provinceFr: "Terre-Neuve-et-Labrador",
          country: "Canada",
          postalCode: "A1B 3R9",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "196 George St",
          addressFr: "196 rue George",
          city: "Sydney",
          provinceEn: "Nova Scotia",
          provinceFr: "Nouvelle-Écosse",
          country: "Canada",
          postalCode: "B1P 6W4",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "50 Victoria St",
          addressFr: "50 rue Victoria",
          city: "Gatineau",
          provinceEn: "Québec",
          provinceFr: "Québec",
          country: "Canada",
          postalCode: "K1A 0C9",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "56 Sparks St",
          addressFr: "56 rue Sparks",
          city: "Ottawa",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "K1A 0C9",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "7 Bayview Rd",
          addressFr: "7 ch Bayview",
          city: "Ottawa",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "K1Y 3B5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "3701 Carling Ave",
          addressFr: "3701 av Carling",
          city: "Ottawa",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "K2H 8S2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "161 Goldenrod Drwy",
          addressFr: "161 prom Goldenrod",
          city: "Ottawa",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "K1A 0C9",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "235 Queen St",
          addressFr: "235 rue Queen",
          city: "Ottawa",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "K1A 0H5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "410 Laurier Ave W",
          addressFr: "410 av Laurier O",
          city: "Ottawa",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "K1A 0R1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "180 Kent St",
          addressFr: "180 rue Kent",
          city: "Ottawa",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "K1P 0B6",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "151 Tunneys Pasture Drwy",
          addressFr: "151 prom Tunneys Pasture",
          city: "Ottawa",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "K1A 0C9",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "8948 Erin Halton TLine",
          addressFr: "8948 Erin-Halton TLine",
          city: "Acton",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "L7J 2L8",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "274 Mackenzie Ave",
          addressFr: "274 av Mackenzie",
          city: "Ajax",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "L1S 2E9",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "126 Wellington St W",
          addressFr: "126 rue Wellington O",
          city: "Aurora",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "L4G 2N9",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "328 Sidney St",
          addressFr: "328 rue Sidney",
          city: "Belleville",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "K8P 3Z3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "4475 Service Rd North",
          addressFr: "4475 Service Rd Nord",
          city: "Burlington",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "L7L 4X7",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "251 Arvin Ave",
          addressFr: "251 av Arvin",
          city: "Stoney Creek",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "L8E 2L9",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "55 Bay St N",
          addressFr: "55 rue Bay N",
          city: "Hamilton",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "L8R 3P7",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "100 Park St, 2nd Fl",
          addressFr: "100 rue Park, 2e étage",
          city: "Kenora",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "P9N 3W9",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "30 Duke St W",
          addressFr: "30 rue Duke O",
          city: "Kitchener",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "N2H 3W5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "78 Meg Dr",
          addressFr: "78 prom Meg",
          city: "London",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "N6E 3T6",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "451 Talbot St",
          addressFr: "451 rue Talbot",
          city: "London",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "N6A 5C9",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "232 Yorktech Dr",
          addressFr: "232 prom Yorktech",
          city: "Markham",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "L6G 1A6",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "175A Admiral Blvd",
          addressFr: "175A boul Admiral",
          city: "Mississauga",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "L5T 2T3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "345 Harry Walker Pky S",
          addressFr: "345 prom Harry Walker S",
          city: "Newmarket",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "L3Y 8P6",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "107 Shirreff Ave",
          addressFr: "107 av Shirreff",
          city: "North Bay",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "P1B 7K8",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "160 Elgin St",
          addressFr: "160 rue Elgin",
          city: "Ottawa",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "K2P 2P7",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "1161 Crawford Dr",
          addressFr: "1161 promCrawford",
          city: "Peterborough",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "K9J 6X6",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "2 Queen St E",
          addressFr: "2 rue Queen E",
          city: "Sault Ste Marie",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "P6A 1Y3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "19 Lisgar St",
          addressFr: "19 rue Lisgar",
          city: "Sudbury",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "P3E 3L4",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "875 Notre Dame Ave",
          addressFr: "875 av Notre-Dame",
          city: "Sudbury",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "P3A 2T2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "201 May St N",
          addressFr: "201 rue May N",
          city: "Thunder Bay",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "P7C 3P4",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "886 Alloy Pl",
          addressFr: "886 place Alloy",
          city: "Thunder Bay",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "P7B 6E6",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "120 Cedar St S",
          addressFr: "120 rue Cedar S",
          city: "Timmins",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "P4N 2G8",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "151 Yonge St",
          addressFr: "151 rue Yonge",
          city: "Toronto",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "M5C 2W7",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "139 Northfield Dr W",
          addressFr: "139 prom Northfield O",
          city: "Waterloo",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "N2L 5A6",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "1500 Ouellette Ave",
          addressFr: "1500 av Ouellette",
          city: "Windsor",
          provinceEn: "Ontario",
          provinceFr: "Ontario",
          country: "Canada",
          postalCode: "N8X 1K7",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "1726 Dolphin Ave",
          addressFr: "1726 av Dolphin",
          city: "Kelowna",
          provinceEn: "British Columbia",
          provinceFr: "Columbie-Britannique",
          country: "Canada",
          postalCode: "V1Y 9R9",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "277 Winnipeg St",
          addressFr: "277 rue Winnipeg",
          city: "Penticton",
          provinceEn: "British Columbia",
          provinceFr: "Columbie-Britannique",
          country: "Canada",
          postalCode: "V2A 5M2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "280 Victoria St",
          addressFr: "280 rue Victoria",
          city: "Prince George",
          provinceEn: "British Columbia",
          provinceFr: "Columbie-Britannique",
          country: "Canada",
          postalCode: "V2L 4X3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "13401 108 Ave",
          addressFr: "13401 108 Av",
          city: "Surrey",
          provinceEn: "British Columbia",
          provinceFr: "Columbie-Britannique",
          country: "Canada",
          postalCode: "V3T 5V6",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "300 Georgia St W",
          addressFr: "300 rue Georgia O",
          city: "Vancouver",
          provinceEn: "British Columbia",
          provinceFr: "Columbie-Britannique",
          country: "Canada",
          postalCode: "V6B 6E1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "3625 Lougheed Hwy",
          addressFr: "3625 Autoroute Lougheed",
          city: "Vancouver",
          provinceEn: "British Columbia",
          provinceFr: "Columbie-Britannique",
          country: "Canada",
          postalCode: "V5M 2A6",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "1230 Government St",
          addressFr: "1230 rue Government",
          city: "Victoria",
          provinceEn: "British Columbia",
          provinceFr: "Columbie-Britannique",
          country: "Canada",
          postalCode: "V8W 3M4",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "300 Main St",
          addressFr: "300 rue Main",
          city: "Whitehorse",
          provinceEn: "Yukon",
          provinceFr: "Yukon",
          country: "Canada",
          postalCode: "Y1A 2B5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "220 4 Ave SE",
          addressFr: "220 4 Av SE",
          city: "Calgary",
          provinceEn: "Alberta",
          provinceFr: "Alberta",
          country: "Canada",
          postalCode: "T2G 4X3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "9305 50 St NW",
          addressFr: "9305 50 Rue NO",
          city: "Edmonton",
          provinceEn: "Alberta",
          provinceFr: "Alberta",
          country: "Canada",
          postalCode: "T6B 2L5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "9700 Jasper Ave NW",
          addressFr: "9700 av Jasper NO",
          city: "Edmonton",
          provinceEn: "Alberta",
          provinceFr: "Alberta",
          country: "Canada",
          postalCode: "T5J 4C3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "1945 Hamilton St",
          addressFr: "1945 rue Hamilton",
          city: "Regina",
          provinceEn: "Saskatchewan",
          provinceFr: "Saskatchewan",
          country: "Canada",
          postalCode: "S4P 2C7",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "123 2nd Ave S",
          addressFr: "123 2e Av S",
          city: "Saskatoon",
          provinceEn: "Saskatchewan",
          provinceFr: "Saskatchewan",
          country: "Canada",
          postalCode: "S7K 7E6",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "400 St Mary Ave",
          addressFr: "400 av St Mary",
          city: "Winnipeg",
          provinceEn: "Manitoba",
          provinceFr: "Manitoba",
          country: "Canada",
          postalCode: "R3C 4K5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "5101 50 Ave",
          addressFr: "5101 50 Av",
          city: "Yellowknife",
          provinceEn: "Northwest Territories",
          provinceFr: "Territoires du Nord-Ouest",
          country: "Canada",
          postalCode: "X1A 2P3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "1155 Metcalfe St",
          addressFr: "1155 rue Metcalfe",
          city: "Montréal",
          provinceEn: "Québec",
          provinceFr: "Québec",
          country: "Canada",
          postalCode: "H3B 2V6",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "1550 d'Estimauville Ave",
          addressFr: "1550 av d'Estimauville",
          city: "Québec",
          provinceEn: "Québec",
          provinceFr: "Québec",
          country: "Canada",
          postalCode: "G1J 0C4",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "2665 King St W",
          addressFr: "2665 rue King O",
          city: "Sherbrooke",
          provinceEn: "Québec",
          provinceFr: "Québec",
          country: "Canada",
          postalCode: "J1L 2G5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          addressEn: "9177 Langelier Blvd",
          addressFr: "9177 boul Langelier",
          city: "St-Léonard",
          provinceEn: "Québec",
          provinceFr: "Québec",
          country: "Canada",
          postalCode: "H1P 3K9",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
    // .then(() => {
    //   return queryInterface.bulkInsert(
    //     "locations",
    //     [
    //       {
    //         id: "5888300c-0245-11ea-8d71-362b9e155667",
    //         addressEn: "9177 Langelier Blvd",
    //         addressFr: "9177 boul Langelier",
    //         city: "St-Léonard",
    //         provinceEn: "Québec",
    //         provinceFr: "Québec",
    //         country: "Canada",
    //         postalCode: "H1P 3K9",
    //         createdAt: new Date(),
    //         updatedAt: new Date()
    //       },
    //       {
    //         id: "60fd7bc0-0245-11ea-8d71-362b9e155667",
    //         addressEn: "5101 50 Ave",
    //         addressFr: "5101 50 Av",
    //         city: "Yellowknife",
    //         provinceEn: "Northwest Territories",
    //         provinceFr: "Territoires du Nord-Ouest",
    //         country: "Canada",
    //         postalCode: "X1A 2P3",
    //         createdAt: new Date(),
    //         updatedAt: new Date()
    //       },
    //       {
    //         id: "64f770aa-0245-11ea-8d71-362b9e155667",
    //         addressEn: "1945 Hamilton St",
    //         addressFr: "1945 rue Hamilton",
    //         city: "Regina",
    //         provinceEn: "Saskatchewan",
    //         provinceFr: "Saskatchewan",
    //         country: "Canada",
    //         postalCode: "S4P 2C7",
    //         createdAt: new Date(),
    //         updatedAt: new Date()
    //       },
    //       {
    //         id: "6a91edec-0245-11ea-8d71-362b9e155667",
    //         addressEn: "232 Yorktech Dr",
    //         addressFr: "232 prom Yorktech",
    //         city: "Markham",
    //         provinceEn: "Ontario",
    //         provinceFr: "Ontario",
    //         country: "Canada",
    //         postalCode: "L6G 1A6",
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
    return queryInterface.bulkDelete("locations", null, {});
  }
};
