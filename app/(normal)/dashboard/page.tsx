import React from "react";
import { QuizTable } from "./_components/QuizTable";
import prisma from "@/lib/prisma";
import { QuizDialog } from "./_components/QuizDialog";
import { EQuizModalType } from "@/types";

const DashboardPage = async () => {
  const quizes = await prisma.quiz.findMany();
  // console.log(quizes);
  return (
    <div className="max-w-screen-lg mx-auto py-12 text-white">
      <div className="pb-4 border-b border-blue-700 flex justify-between">
        <h1 className="text-3xl font-bold text-blue-800">Questions</h1>
        <QuizDialog type={EQuizModalType.CREATE} />
      </div>
      <QuizTable quizes={quizes} />
    </div>
  );
};

export default DashboardPage;
