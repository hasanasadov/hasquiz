"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { PlusIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { EQuizModalType } from "@/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createQuiz } from "@/actions/quiz";
import { toast } from "sonner";

const formSchema = z
  .object({
    question: z.string().nonempty(),
    answers: z
      .array(
        z.object({
          text: z.string().nonempty(),
          isTrue: z.boolean(),
        })
      )
      .min(2, "At least two answers are required"),
  })
  .refine((data) => data.answers.filter((a) => a.isTrue).length === 1, {
    message: "Exactly one answer should be marked as correct",
    path: ["answers"],
  });

type Props = {
  type: EQuizModalType;
};

export const QuizDialog = ({ type }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isCreate = type === EQuizModalType.CREATE;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answers: [
        { text: "", isTrue: false },
        { text: "", isTrue: false },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { ok, error } = await createQuiz({
      quiz: {
        question: values.question,
        answers: values.answers,
      },
    });
    if (!ok) {
      return toast.error(error);
    }
    toast.success("Quiz created successfully");
    form.reset();
    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-800">
          {isCreate && (
            <>
              <PlusIcon /> Add Question
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Create New Quiz" : "Edit Quiz"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Type question..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3 items-center">
                <FormField
                  control={form.control}
                  name={`answers.${index}.text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer {index + 1}</FormLabel>
                      <FormControl>
                        <Input placeholder="Answer text..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`answers.${index}.isTrue`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          className="h-8 w-8 mt-8 "
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {fields.length > 2 && (
                  <Button variant="ghost" onClick={() => remove(index)} className="mt-6">
                    <TrashIcon />
                  </Button>
                )}
              </div>
            ))}

            <Button
              variant="link"
              type="button"
              onClick={() => append({ text: "", isTrue: false })}
            >
              Add Answer
            </Button>

            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant={"secondary"} type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {isCreate ? "Create Quiz" : "Update Quiz"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
