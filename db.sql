CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UC_username` (`username`)
);

CREATE TABLE `list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` varchar(50) ,
  `updatedAt` varchar(50),
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `List_ibfk` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
);

CREATE TABLE `category` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` varchar(50) ,
  `updatedAt` varchar(50),
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `Category_ibfk` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
);

CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `note` varchar(50) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `createdAt` varchar(50) ,
  `updatedAt` varchar(50),
  PRIMARY KEY (`id`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  CONSTRAINT `item_ibfk_2` FOREIGN KEY (`category`) REFERENCES `category` (`id`)
);

CREATE TABLE `listOfItems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` int(11) NOT NULL,
  `list` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `LOI_ibfk1` FOREIGN KEY (`list`) REFERENCES `list` (`id`),
  CONSTRAINT `LOI_ibfk2` FOREIGN KEY (`item`) REFERENCES `item` (`id`)
);

CREATE TABLE `arrayList` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) NOT NULL,
  `list` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `list` (`list`),
  CONSTRAINT `ArrayList_ibfk` FOREIGN KEY (`list`) REFERENCES `list` (`id`)
);
