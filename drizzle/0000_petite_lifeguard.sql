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
CREATE TABLE `code-quest_post` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`createdById` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `code-quest_post_id` PRIMARY KEY(`id`)
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
CREATE INDEX `createdById_idx` ON `code-quest_post` (`createdById`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `code-quest_post` (`name`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `code-quest_session` (`userId`);