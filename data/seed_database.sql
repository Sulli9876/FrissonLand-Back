BEGIN;
INSERT INTO "category" ("id", "name") VALUES
  (1, 'Montagne russe'),
  (2, 'Maison hantée'),
  (3, 'Attraction pendulaire');

INSERT INTO "attraction" ("id", "name", "description", "image", "duration", "category_id") VALUES
(1, 'Romero Coaster', 'Inspiré par les films de George A. Romero, ce coaster plonge les visiteurs dans un univers de zombies.', 'https://i.ibb.co/35Tj6yR2/romero-coaster.webp', '00:15:00', 1),
(2, 'Dead Space Mountain', 'Ce coaster intérieur recrée une ambiance oppressante du jeu vidéo Dead Space.', 'https://i.ibb.co/1YjLxC3q/dead-space.webp','00:10:30', 1),
(3, 'Dernier Train pour Paris', 'Ce roller coaster à grande vitesse inspiré du film Dernier train pour Busan.', 'https://i.ibb.co/yBhHp7qt/last-train.webp','00:05:45', 1),
(4, 'Evil Brain', 'Plongée dans un univers sombre du film Evil Dead, cette maison hantée emmène les visiteurs dans une forêt sinistre, à travers des cabanes abandonnées où des esprits maléfiques rôdent.', 'https://i.ibb.co/yFVGbV0f/evil-brain.webp','00:45:00', 2),
(5, 'Scum World', 'Basée sur le jeu vidéo Scum, cette maison hantée recrée un monde post-apocalyptique où les criminels et les mutants règnent en maîtres.', 'https://i.ibb.co/VcYXs0n9/scum-world.webp','00:30:00', 2),
(6, 'La Colline Silencieuse à des Yeux', 'Cette attraction combine une atmosphère de Silent Hill avec les créatures effrayantes et les brumes épaisses caractéristiques du jeu.', 'https://i.ibb.co/cX2Stpxh/the-hill.webp','00:15:00', 2),
(7, 'Le Kamikaze Zombie', 'Attraction à sensations fortes où les visiteurs sont projetés dans toutes les directions, simulant une évasion désespérée face à une horde de zombies.', 'https://i.ibb.co/27KwLTcD/kamikaze-zombie.webp','00:11:00', 3),
(8, 'Le Bateau de Davis John', 'Inspirée de des Pirates des Caraïbes, cette attraction aquatique embarque les visiteurs sur un bateau de pirates zombies.', 'https://i.ibb.co/qLsQxNn8/Chat-GPT-Image-16-mai-2025-20-13-27.png','00:16:00', 3),
(9, 'La Roue du Destin', 'Cette grande roue offre une vue panoramique du parc, mais chaque cabine propose une ambiance différente.', 'https://i.ibb.co/pjHHfzXC/the-wheel.webp','00:2:00', 3);








 

INSERT INTO "ticket" ("id", "value", "name") VALUES
  (1, 25, 'Ticket enfant'),
  (2, 50,'Ticket adulte');
  

INSERT INTO "user" ("id", "mail", "first_name", "last_name", "password", "role" ) VALUES
(1, 'admin1@example.com', 'John', 'Doe', 'password123', 'admin'),
(2, 'admin2@example.com', 'Jane', 'Doe', 'password456', 'admin'),
(3, 'admin3@example.com', 'Alice', 'Smith', 'password789', 'admin'),
(4, 'admin4@example.com', 'Bob', 'Jones',  'password1011', 'admin'),
(5, 'carol.white5@example.com', 'Carol', 'White','password345', 'user'),
(6, 'dave.black6@example.com', 'Dave', 'Black', 'password678', 'user'),
(7, 'eve.green7@example.com', 'Eve', 'Green', 'password901', 'user'),
(8, 'frank.miller8@example.com', 'Frank', 'Miller','password234', 'user'),
(9, 'grace.taylor9@example.com', 'Grace', 'Taylor', 'password567', 'user'),
(10, 'hank.moore10@example.com', 'Hank', 'Moore', 'password890', 'user');


INSERT INTO "review" ("note", "commentaire", "user_id", "attraction_id") VALUES
(5, 'Incroyable expérience, les zombies étaient très réalistes !', 5, 1),
(4, 'Super sensations, j''ai adoré.', 6, 1),
(3, 'Bonne ambiance, mais un peu court.', 7, 2),
(4, 'Tension palpable tout le long du ride !', 9, 3),
(2, 'Pas assez de frissons à mon goût.', 10, 3),
(5, 'Effrayant comme il faut ! Décors top.', 5, 4),
(3, 'Ambiance réussie mais manque d’interaction.', 8, 6),
(4, 'Énorme montée d’adrénaline, j''ai crié tout le long !', 6, 7),
(5, 'Le meilleur manège du parc !', 7, 7),
(3, 'Sympa, mais un peu court.', 10, 7),
(4, 'Belle immersion, j''aurais aimé plus d’action.', 5, 8),
(2, 'Bof, la vue était bien mais l’ambiance pas au niveau.', 9, 9);

--INSERT INTO "book" ("id","reservation_number", "visit_date", "quantity", "ticket_id", "user_id") VALUES
--  (1,123, '2024-11-15',3, 1 , 1),
--  (2,124, '2024-11-15',2 ,2 , 2),
--  (3,125, '2024-12-05',1 , 1, 10), 
 -- (4,126, '2024-10-15',1 , 2, 10);

SELECT setval('attraction_id_seq', (SELECT MAX("id") FROM "attraction")); -- indique à la db de générer les nouveau id en partant de la plus grande valeur déjà existante
SELECT setval('category_id_seq', (SELECT MAX("id") FROM "category"));
SELECT setval('ticket_id_seq', (SELECT MAX("id") FROM "ticket"));
SELECT setval('user_id_seq', (SELECT MAX("id") FROM "user"));
SELECT setval('book_id_seq', (SELECT MAX("id") FROM "book"));

COMMIT;