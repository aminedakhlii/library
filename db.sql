CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `super_admin` tinyint(1) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UC_username` (`username`)
)


CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user1` int(11) NOT NULL,
  `user2` int(11) NOT NULL,
  `messages_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user1` (`user1`),
  KEY `user2` (`user2`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`user1`) REFERENCES `users` (`id`),
  CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`user2`) REFERENCES `users` (`id`)
)

CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `content` mediumtext NOT NULL,
  `sender` int(11) NOT NULL,
  `room` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room` (`room`),
  KEY `sender` (`sender`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`room`) REFERENCES `rooms` (`id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender`) REFERENCES `users` (`id`)
)

CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `Nbr` int(11) DEFAULT NULL
)

CREATE TABLE `borrows` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `bid` int(11) NOT NULL,
  `endDate` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `bid` (`bid`),
  CONSTRAINT `borrows_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`),
  CONSTRAINT `borrows_ibfk_2` FOREIGN KEY (`bid`) REFERENCES `books` (`id`)
)

https://instagram.ftun4-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/70963821_194783328205818_4172982032911477857_n.jpg?tp=1&_nc_ht=instagram.ftun4-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=zDfvQULrHQ0AX9ChcTf&edm=AP_V10EAAAAA&ccb=7-4&oh=063334dbc638b0cc7312371406cc62aa&oe=60989777&_nc_sid=4f375e
https://instagram.ftun7-1.fna.fbcdn.net/v/t51.2885-15/e35/165128977_220769489825187_2638101355551754251_n.jpg?tp=1&_nc_ht=instagram.ftun7-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=Ygo9ZmmC8N0AX_-jJ07&edm=AP_V10EAAAAA&ccb=7-4&oh=0351c04c24502047a47479173f514a28&oe=6098F563&_nc_sid=4f375e



https://scontent-ort2-1.cdninstagram.com/v/t51.2885-19/44262437_1941335106174567_6266493156154408960_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com&_nc_ohc=h9TQsAt51i8AX-tzeCR&edm=AKralEIAAAAA&ccb=7-4&oh=0dceafe83b7378f71da286a979a06f54&oe=60973981&_nc_sid=5e3072

https://scontent-pmo1-1.cdninstagram.com/v/t51.2885-19/s150x150/44262437_1941335106174567_6266493156154408960_n.jpg?tp=1&_nc_ht=scontent-pmo1-1.cdninstagram.com&_nc_ohc=h9TQsAt51i8AX_uTbcZ&edm=ABfd0MgAAAAA&ccb=7-4&oh=c953251740cc77fcf841b33be72c96ad&oe=6098B539&_nc_sid=7bff83
