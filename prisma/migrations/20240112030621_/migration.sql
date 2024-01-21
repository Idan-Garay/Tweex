-- DropIndex
DROP INDEX `Comment_commentId_fkey` ON `Comment`;

-- DropIndex
DROP INDEX `Comment_tweetId_fkey` ON `Comment`;

-- DropIndex
DROP INDEX `Comment_userId_fkey` ON `Comment`;

-- DropIndex
DROP INDEX `Follower_followerId_fkey` ON `Follower`;

-- DropIndex
DROP INDEX `LikedTweet_userId_fkey` ON `LikedTweet`;

-- DropIndex
DROP INDEX `Retweet_tweetId_fkey` ON `Retweet`;

-- DropIndex
DROP INDEX `Tweet_authorId_fkey` ON `Tweet`;

-- DropIndex
DROP INDEX `TweetImage_commentId_fkey` ON `TweetImage`;

-- DropIndex
DROP INDEX `TweetImage_tweetId_fkey` ON `TweetImage`;

-- CreateTable
CREATE TABLE `EmailCodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EmailCodes_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
