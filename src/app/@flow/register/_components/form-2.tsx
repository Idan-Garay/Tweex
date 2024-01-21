import { Button } from "@/_components/ui/button";
import { DialogTitle } from "@/_components/ui/dialog";
import { Input } from "@/_components/ui/input";
import { InputConceal } from "@/_components/ui/input-conceal";
import { useContext } from "react";
import { useToast } from "@/_components/ui/use-toast";
import { useLoading } from "@/_lib/hooks/use-loading";
import { Loading } from "@/_components/ui/loading";
import { RegisterUserContext } from "../_hooks/use-register-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/_components/ui/form";
const schema = z.object({
  username: z.string(),
  password: z.string().min(6).max(16),
  email: z.string().email(),
  dob: z.object({
    month: z.string().min(1).max(12),
    year: z.string(),
    day: z.string(),
  }),
});

export const Form2 = ({ nextStep }: { nextStep: () => void }) => {
  const registerUser = useContext(RegisterUserContext);
  const form = useForm<z.infer<typeof schema>>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      email: registerUser?.email ?? "",
      username: registerUser?.username ?? "",
      password: "",
      dob: registerUser?.dob ?? {},
    },
  });
  const { formState } = form;
  const { toast } = useToast();
  const { loading, setLoading } = useLoading();
  const handleRegister = async (data: z.infer<typeof schema>) => {
    setLoading(true);
    const {dob} = data
    const birthDate = new Date(parseInt(dob.year), parseInt(dob.month)-1, parseInt(dob.day))
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify({...data,birthDate}),
      });

      // handle request
      if (res.ok) {
        // save authorized user to browser
        const data = (await res.json()) as {
          success: boolean;
          message: string;
        };
        toast({
          description: data.message,
        });
        console.log("data", data);
        if (data.success) {
          nextStep();
        }
      } else {
        console.log("not ok");
        // error handle
      }
    } catch (e) {
      console.log("e", e);
    }
    setLoading(false);
  };

  return loading === false ? (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="flex h-full flex-col"
      >
        <DialogTitle className="text-3xl font-bold">
          Create your account
        </DialogTitle>
        <div className="h-9 shrink-0" />
        <Input
          defaultValue={form.getValues().username}
          className="h-14 min-h-[3.5rem] text-base disabled:cursor-default"
          placeholder="Phone, email, or username"
          disabled
        />
        <div className="h-6 shrink-0" />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputConceal {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="h-full" />

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!formState.isValid || formState.isSubmitting}
          >
            {formState.isSubmitting ? (
              <Loading />
            ) : (
              <span className="font-semibold">Next</span>
            )}
          </Button>
        </div>
        <div className="h-6 shrink-0" />
      </form>
    </Form>
  ) : (
    <Loading />
  );
};
