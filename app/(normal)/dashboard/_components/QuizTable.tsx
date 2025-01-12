import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { Quiz } from "@prisma/client";
import React from "react";
import DeleteButton  from "./DeleteButton";
type Props = {
  quizes: Quiz[];
};

export const QuizTable = ({ quizes }: Props) => {
  return (
    <Table className="text-white">
      <TableHeader>
        <TableRow>
          <TableHead>Questions</TableHead>
          <TableHead>Answers</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {quizes?.map((quiz) => (
          <TableRow key={quiz.id}>
            <TableCell>{quiz.question}</TableCell>

            <TableCell>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Answer</TableHead>
                    <TableHead>Is True</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {prisma.answer
                    .findMany({
                      where: {
                        quizId: quiz.id,
                      },
                    })
                    .then((answers) => {
                      return answers.map((answer) => (
                        <TableRow key={answer.id}>
                          <TableCell>{answer.text}</TableCell>
                          <TableCell>{answer.isTrue ? "Yes" : "No"}</TableCell>
                        </TableRow>
                      ));
                    })}
                </TableBody>
              </Table>
            </TableCell>

            <TableCell>
              <DeleteButton quiz={quiz} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
