import { Prisma, PrismaClient } from "@prisma/client";
import bank from "./comments.js";
import objs from "./obj.js";
const prisma = new PrismaClient();

const createObjectives = async () => {
  const count = await prisma.comment.count();
  if (count > 0) return;

  prisma.$transaction(
    objs.map((obj) =>
      prisma.objectives.create({
        data: {
          text: obj.text,
          class_id: obj.class_id,
          class_name: obj.class_name,
          subject_id: obj.subject_id,
          subject_name: obj.subject,
          exam_type: "FIRST TERM EXAMINATION - NOV/2023",
        },
      })
    )
  );
};

const createComment = async () => {
  const count = await prisma.comment.count();
  if (count > 0) return;

  const comments = bank.comments.sort((a, b) => Number(a.id) - Number(b.id));
  prisma.$transaction(
    comments.map((comment) =>
      prisma.comment.create({
        data: {
          text: comment.text,
          flagged: comment.flagged,
          type: comment.type || "unrated",
          tags: comment.tags?.join(",") || "",
        },
      })
    )
  );
};

createObjectives()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

createComment()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
