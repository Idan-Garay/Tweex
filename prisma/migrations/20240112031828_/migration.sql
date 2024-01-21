/*
  Warnings:

  - Added the required column `expirationDate` to the `EmailCodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `EmailCodes` ADD COLUMN `expirationDate` DATETIME(3) NOT NULL;
