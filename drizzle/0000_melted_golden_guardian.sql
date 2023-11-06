CREATE TABLE `code-quest_account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `code-quest_account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `code-quest_answer` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`questionId` bigint NOT NULL,
	`answerText` varchar(255) NOT NULL,
	`isCorrect` boolean NOT NULL DEFAULT false,
	`isSelected` boolean DEFAULT false,
	CONSTRAINT `code-quest_answer_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `code-quest_gamePrompt` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`gameId` varchar(255) NOT NULL,
	`input` text NOT NULL,
	`responce` text NOT NULL,
	CONSTRAINT `code-quest_gamePrompt_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `code-quest_game` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`hintsLeft` int DEFAULT 0,
	`isSplitAnswersUsed` boolean DEFAULT false,
	`isCallFriendUsed` boolean DEFAULT false,
	`isGetHelpUsed` boolean DEFAULT false,
	CONSTRAINT `code-quest_game_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `code-quest_post` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`createdById` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `code-quest_post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `code-quest_question` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`gameId` varchar(255) NOT NULL,
	`questionText` text NOT NULL,
	`explanation` text,
	CONSTRAINT `code-quest_question_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `code-quest_session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `code-quest_session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `code-quest_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `code-quest_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `code-quest_verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `code-quest_verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `code-quest_account` (`userId`);--> statement-breakpoint
CREATE INDEX `questionIdIdx` ON `code-quest_answer` (`questionId`);--> statement-breakpoint
CREATE INDEX `gameIdIdx` ON `code-quest_gamePrompt` (`gameId`);--> statement-breakpoint
CREATE INDEX `gameIdIdx` ON `code-quest_game` (`id`);--> statement-breakpoint
CREATE INDEX `createdById_idx` ON `code-quest_post` (`createdById`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `code-quest_post` (`name`);--> statement-breakpoint
CREATE INDEX `gameIdIdx` ON `code-quest_question` (`gameId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `code-quest_session` (`userId`);