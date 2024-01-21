"use client";

import { Button } from "@/_components/ui/button";
import { DialogTitle } from "@/_components/ui/dialog";
import { Input } from "@/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/_components/ui/select";
import { useContext, useEffect, useState } from "react";
import { RegisterUserDispatchContext } from "../_hooks/use-register-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/_components/ui/form";
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
  username: z
    .string()
    .min(2, { message: "Minimum of 2 characters is required." })
    .max(16, { message: "Maximum of 16 characters is required" }),
  email: z.string().email(),
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

export const Form1 = ({ nextStep }: { nextStep: () => void }) => {
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
  const registerUserDispatch = useContext(RegisterUserDispatchContext);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const { username, email } = form.getValues();
      const res = await fetch("/api/user/register/user-exist", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
        }),
      });
      if (res.ok) {
        const json = (await res.json()) as {
          success: boolean;
          message: string;
        };
        if (json.success) {
          registerUserDispatch(data);
          nextStep();
        } else {
          const message = json.message ;
          if (message.includes("email")) {
            form.setError("email", { message }, { shouldFocus: true });
          } else if (message.includes("username")) {
            form.setError("username", { message }, { shouldFocus: true });
          }
          toast({ description: message });
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
          <div className="h-9 shrink-0" />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-14 min-h-[3.5rem]"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="h-6 shrink-0" />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-14 min-h-[3.5rem]"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="h-6 shrink-0" />
          <span className="block text-base font-semibold">Date of birth</span>
          <div className="h-1 shrink-0" />
          <p className="text-sm leading-4 text-neutral-500">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
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
