CREATE TABLE `saved_movies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`movie_id` integer NOT NULL,
	`title` text(255) NOT NULL,
	`poster` text(255) NOT NULL,
	`backdrop` text(255) NOT NULL,
	`year` text(4) NOT NULL,
	`category` text(255) NOT NULL,
	`watched` integer DEFAULT 0 NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
