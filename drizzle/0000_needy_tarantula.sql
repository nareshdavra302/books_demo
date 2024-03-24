CREATE TABLE `books` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(256),
	`auther` text,
	`published_on` date,
	`genre` varchar(256),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `books_id` PRIMARY KEY(`id`),
	CONSTRAINT `title_idx` UNIQUE(`title`)
);
