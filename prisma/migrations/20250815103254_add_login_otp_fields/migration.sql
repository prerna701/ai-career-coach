-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "loginOtp" TEXT,
ADD COLUMN     "loginOtpExpireAt" TIMESTAMP(3);
