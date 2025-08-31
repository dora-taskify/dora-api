-- CreateTable
CREATE TABLE "public"."board_member" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "board_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "board_member_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."board_member" ADD CONSTRAINT "board_member_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."board_member" ADD CONSTRAINT "board_member_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "public"."board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
