"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Form, FormItem, FormLabel, FormControl } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormSchema = z.infer<typeof formSchema>;

export default function LoginCard() {
  const router = useRouter();
  const { mutate: login } = api.admin.login.useMutation();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    login(data, {
      onSuccess: (data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormItem className="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
              <Input type="email" {...form.register("email")} />
            </FormControl>
          </FormItem>
          <FormItem className="mb-4">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" {...form.register("password")} />
            </FormControl>
            </FormItem>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
