BEGIN;
INSERT INTO "category" ("id", "name") VALUES
  (1, 'Montagne russe'),
  (2, 'Maison hantée'),
  (3, 'Attraction pendulaire');

INSERT INTO "attraction" ("id", "name", "description", "image", "duration", "category_id") VALUES
(1, 'Romero Coaster', 'Inspiré par les films de George A. Romero, ce coaster plonge les visiteurs dans un univers de zombies.', '/images/attractions/romero_coaster.webp', '00:15:00', 1),
(2, 'Dead Space Mountain', 'Ce coaster intérieur recrée une ambiance oppressante du jeu vidéo Dead Space.', 'images/attractions/dead_space.webp','00:10:30', 1),
(3, 'Dernier Train pour Paris', 'Ce roller coaster à grande vitesse inspiré du film Dernier train pour Busan.', 'images/attractions/last_train.webp','00:05:45', 1),
(4, 'Evil Brain', 'Plongée dans un univers sombre du film Evil Dead, cette maison hantée emmène les visiteurs dans une forêt sinistre, à travers des cabanes abandonnées où des esprits maléfiques rôdent.', '/images/attractions/evil_brain.webp','00:45:00', 2),
(5, 'Scum World', 'Basée sur le jeu vidéo Scum, cette maison hantée recrée un monde post-apocalyptique où les criminels et les mutants règnent en maîtres.', '/images/attractions/scum_world.webp','00:30:00', 2),
(6, 'La Colline Silencieuse à des Yeux', 'Cette attraction combine une atmosphère de Silent Hill avec les créatures effrayantes et les brumes épaisses caractéristiques du jeu.', '/images/attractions/the_hill.webp','00:15:00', 2),
(7, 'Le Kamikaze Zombie', 'Attraction à sensations fortes où les visiteurs sont projetés dans toutes les directions, simulant une évasion désespérée face à une horde de zombies.', '/images/attractions/kamikaze_zombie.webp','00:11:00', 3),
(8, 'Le Bateau de Davis John', 'Inspirée de des Pirates des Caraïbes, cette attraction aquatique embarque les visiteurs sur un bateau de pirates zombies.', '/images/attractions/davis_boat.webp','00:16:00', 3),
(9, 'La Roue du Destin', 'Cette grande roue offre une vue panoramique du parc, mais chaque cabine propose une ambiance différente.', '/images/attractions/the_wheel.webp','00:2:00', 3);

 

INSERT INTO "ticket" ("id", "value", "name") VALUES
  (1, 25, 'Ticket enfant'),
  (2, 50,'Ticket adulte');
  

INSERT INTO "user" ("id", "mail", "first_name", "last_name", "birth_date", "address", "password", "role" ) VALUES
(1, 'admin1@example.com', 'John', 'Doe', '1985-06-15', '123 Elm Street, Springfield, IL', 'password123', 'admin'),
(2, 'admin2@example.com', 'Jane', 'Doe', '1990-08-22', '456 Maple Avenue, Springfield, IL', 'password456', 'admin'),
(3, 'admin3@example.com', 'Alice', 'Smith', '2015-12-05', '789 Oak Lane, Springfield, IL', 'password789', 'admin'),
(4, 'admin4@example.com', 'Bob', 'Jones', '1978-11-30', '101 Pine Street, Springfield, IL', 'password1011', 'admin'),
(5, 'carol.white5@example.com', 'Carol', 'White', '1989-04-18', '202 Cedar Drive, Springfield, IL', 'password345', 'user'),
(6, 'dave.black6@example.com', 'Dave', 'Black', '2016-07-12', '303 Birch Road, Springfield, IL', 'password678', 'user'),
(7, 'eve.green7@example.com', 'Eve', 'Green', '1987-02-25', '404 Walnut Circle, Springfield, IL', 'password901', 'user'),
(8, 'frank.miller8@example.com', 'Frank', 'Miller', '1991-09-10', '505 Ash Boulevard, Springfield, IL', 'password234', 'user'),
(9, 'grace.taylor9@example.com', 'Grace', 'Taylor', '1983-03-17', '606 Cherry Street, Springfield, IL', 'password567', 'user'),
(10, 'hank.moore10@example.com', 'Hank', 'Moore', '1980-10-30', '707 Spruce Way, Springfield, IL', 'password890', 'user');

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