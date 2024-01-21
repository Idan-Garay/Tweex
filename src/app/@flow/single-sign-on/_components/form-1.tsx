"use client";

import { Button } from "@/_components/ui/button";
import { DialogTitle } from "@/_components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/_components/ui/select";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem } from "@/_components/ui/form";
import { Loading } from "@/_components/ui/loading";
import { useToast } from "@/_components/ui/use-toast";
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const YEAR_GAP = 80;
const AGE_LIMIT = 12;
const STARTING_YEAR = new Date().getFullYear() - AGE_LIMIT - YEAR_GAP;
const YEARS = Array(YEAR_GAP)
  .fill(0)
  .map((x, i) => String(STARTING_YEAR + i))
  .reverse();

const schema = z.object({
  dob: z.object({
    month: z.string().min(1).max(12),
    year: z.string(),
    day: z.string(),
  }),
});
const getAllDaysInMonth = (year: number, month: number) => {
  const days = Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => new Date(year, month - 1, i + 1),
  );
  return days;
};

export const SsoForm1 = ({ nextStep }: { nextStep: () => void }) => {
  const { toast } = useToast();
  const [days, setDays] = useState(
    getAllDaysInMonth(new Date().getFullYear(), new Date().getDate()),
  );
  const form = useForm<z.infer<typeof schema>>({
    mode: "all",
    resolver: zodResolver(schema),
  });
  const { formState } = form;
  const watchedMonth: string = useWatch({
    control: form.control,
    name: "dob.month",
  });
  const watchedYear: string = useWatch({
    control: form.control,
    name: "dob.year",
  });
  const watchedDay: string = useWatch({
    control: form.control,
    name: "dob.day",
  });

  const onSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    try {
      const res = await fetch("/api/user/update-details", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          dob: new Date(
            parseInt(watchedYear),
            parseInt(watchedMonth) - 1,
            parseInt(watchedDay),
          ),
        }),
      });
      if (res.ok) {
        const json = (await res.json()) as {
          success: boolean;
          message: string;
        };
        if (json.success) {
          nextStep();
        } else {
          toast({ description: json.message });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const newDays = getAllDaysInMonth(
      typeof watchedYear === "undefined" ? 2001 : parseInt(watchedYear),
      typeof watchedMonth === "undefined" ? 1 : parseInt(watchedMonth),
    );
    setDays(newDays);
  }, [watchedMonth, watchedYear]);

  return formState.isSubmitting ? (
    <Loading />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex h-full w-full flex-col px-14 pb-0 pt-10">
          <DialogTitle>Create your account</DialogTitle>
          <div className="h-1 shrink-0" />
          <p className="text-sm leading-4 text-neutral-500">
            This won&apos;t be public.
          </p>
          <div className="h-3 shrink-0" />
          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="dob.month"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger placeholder=" ">
                      {typeof field.value !== "undefined"
                        ? MONTHS[parseInt(field.value) - 1]
                        : "Month"}
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((month, index) => (
                        <SelectItem key={month} value={String(index + 1)}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob.day"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      {typeof field.value !== "undefined" ? field.value : "Day"}
                    </SelectTrigger>
                    <SelectContent>
                      {days
                        .map((x) =>
                          x.toLocaleDateString([], { day: "numeric" }),
                        )
                        .map((itemDay) => (
                          <SelectItem key={itemDay} value={itemDay}>
                            {itemDay}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob.year"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger placeholder="" aria-label="year">
                      {typeof field.value !== "undefined"
                        ? field.value
                        : "Year"}
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((itemYear) => (
                        <SelectItem key={itemYear} value={itemYear}>
                          {itemYear}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="h-16 sm:grow"></div>
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={!formState.isValid || formState.isSubmitting}
            >
              <span className="font-semibold">Next</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
