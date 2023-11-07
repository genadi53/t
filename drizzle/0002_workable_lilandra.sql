ALTER TABLE `code-quest_game` MODIFY COLUMN `userId` varchar(255);--> statement-breakpoint
ALTER TABLE `code-quest_question` MODIFY COLUMN `difficulty` varchar(255) NOT NULL DEFAULT 'easy';--> statement-breakpoint
ALTER TABLE `code-quest_game` ADD `lifes` int DEFAULT 1;--> statement-breakpoint
ALTER TABLE `code-quest_game` ADD `time_to_answer_seconds` int DEFAULT 0;