"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CreateQuizParams = {
  quiz: {
    question: string;
    answers: {
      text: string;
      isTrue: boolean;
    }[];
  };
};

export async function createQuiz({ quiz }: CreateQuizParams) {
  try {
    const result = await prisma.quiz.create({
      data: {
        question: quiz.question,
        answers: {
          create: quiz.answers,
        },
      },
    });

    revalidatePath("/dashboard");
    return {
      ok: true,
      result,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: "Something went wrong",
    };
  }
}

// Example function to delete a quiz and its associated answers
export const deleteQuiz = async (quizId: string) => {
  await prisma.answer.deleteMany({
    where: {
      quizId: quizId, // Delete all answers for the specified quiz
    },
  });
  await prisma.quiz.delete({
    where: {
      id: quizId,
    },
  });
  revalidatePath("/dashboard");
};


export async function getAnswers(id: string) {
  try {
    const answers = await prisma.answer.findMany({
      where: {
        quizId: id,
      },
    });

    return {
      answers,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: "Something went wrong",
    };
  }
}

// export async function getQuizes() {
//   try {
//     const quizes = await prisma.quiz.findMany();
//     // console.log("quizes", quizes);
//     return {
//       quizes,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       ok: false,
//       error: "Something went wrong",
//     };
//   }
// }
