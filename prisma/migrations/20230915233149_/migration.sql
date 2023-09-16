-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "bannerImgUrl" TEXT,
    "title" TEXT NOT NULL,
    "tag" TEXT,
    "description" TEXT,
    "options" JSONB[],
    "services" JSONB,
    "currentPrice" INTEGER NOT NULL,
    "priceCurrency" TEXT,
    "previousPrice" TEXT,
    "dealDescription" TEXT,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Posts_id_key" ON "Posts"("id");
