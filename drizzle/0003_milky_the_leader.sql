ALTER TABLE `code-quest_gamePrompt` ADD `number` int DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `code-quest_game` ADD `score` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `code-quest_question` ADD `number` int DEFAULT 1 NOT NULL;