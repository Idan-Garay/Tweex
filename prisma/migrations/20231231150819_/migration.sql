-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_tweetId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Follower` DROP FOREIGN KEY `Follower_followerId_fkey`;

-- DropForeignKey
ALTER TABLE `Follower` DROP FOREIGN KEY `Follower_userId_fkey`;

-- DropForeignKey
ALTER TABLE `LikedTweet` DROP FOREIGN KEY `LikedTweet_tweetId_fkey`;

-- DropForeignKey
ALTER TABLE `LikedTweet` DROP FOREIGN KEY `LikedTweet_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Retweet` DROP FOREIGN KEY `Retweet_tweetId_fkey`;

-- DropForeignKey
ALTER TABLE `Retweet` DROP FOREIGN KEY `Retweet_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Tweet` DROP FOREIGN KEY `Tweet_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `TweetImage` DROP FOREIGN KEY `TweetImage_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `TweetImage` DROP FOREIGN KEY `TweetImage_tweetId_fkey`;

-- DropForeignKey
ALTER TABLE `UserDetail` DROP FOREIGN KEY `UserDetail_userId_fkey`;
