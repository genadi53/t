ALTER TABLE `code-quest_game` RENAME COLUMN `isGetHelpUsed` TO `isAudienceUsed`;--> statement-breakpoint
ALTER TABLE `code-quest_game` ADD `totalQuestions` int DEFAULT 15 NOT NULL;--> statement-breakpoint
ALTER TABLE `code-quest_game` ADD `isGameWon` boolean DEFAULT false;