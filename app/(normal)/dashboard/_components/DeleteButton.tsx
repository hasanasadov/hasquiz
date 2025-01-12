"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { deleteQuiz } from "@/actions/quiz";
import { Quiz } from "@prisma/client";

type Prop = {
  quiz: Quiz;
};

const DeleteButton = ({ quiz }: Prop) => {
  const handleClick = () => {
    deleteQuiz(quiz.id);
  };

  return <Button onClick={handleClick}>Delete</Button>;
};

export default DeleteButton;
