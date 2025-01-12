// ProductsPage.tsx
import { QuizComponent } from "@/components/shared/QuizComponent";
import prisma from "@/lib/prisma";

export default async function ProductsPage() {
  const quizzes = await prisma.quiz.findMany({
    include: { answers: true },
  });

  return (
    <div >
      <QuizComponent quizzes={quizzes} />
    </div>
  );
}
