"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Form, FormItem, FormLabel, FormControl } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useState } from "react";
import Loader from "./loader";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3),
});

type FormSchema = z.infer<typeof formSchema>;

export default function LoginCard() {
  const { mutate: signup } = api.admin.signup.useMutation();
  const { data: rootAdminExists } = api.admin.rootAdminExists.useQuery();
  const { mutate: createRootAdmin } = api.admin.createRootAdmin.useMutation();

  const [rootAdminLoading, setRootAdminLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [rootAdminMessage, setRootAdminMessage] = useState<string | null>(null);

  const createAdminForm = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    setSignupLoading(true);
    signup(data, {
      onSuccess: (data) => {
        console.log(data);
        setSignupLoading(false);
      },
      onError: (error) => {
        console.error(error);
        setSignupLoading(false);
      },
    });
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{!rootAdminExists ? "Create Root Admin" : "Signup"}</CardTitle>
        </CardHeader>
      <CardContent>
        {
          !rootAdminExists ? (
            <Button className="w-full" onClick={() => {
              createRootAdmin(void 0, {
                onSuccess: ({ email, password }) => {
                  setRootAdminMessage(`Root Admin created: ${email} ${password}`);
                  setRootAdminLoading(false);
                },
                onError: (error) => {
                  setError(error.message);
                  setRootAdminLoading(false);
                },
              })
              setRootAdminLoading(true);
            }} disabled={rootAdminLoading}>
              {rootAdminLoading ? <Loader /> : "Create Root Admin"}
            </Button>
          ) : (
            <Form {...createAdminForm}>
              <form onSubmit={createAdminForm.handleSubmit(onSubmit)}>
                <FormItem className="mb-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...createAdminForm.register("email")} />
                  </FormControl>
                </FormItem>
                <FormItem className="mb-4">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...createAdminForm.register("name")} />
                  </FormControl>
                </FormItem>
                <FormItem className="mb-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...createAdminForm.register("password")} />
                  </FormControl>
                </FormItem>
                <Button className="w-full" type="submit">
                  {signupLoading ? <Loader /> : "Signup"}
                </Button>
              </form>
            </Form>
          )
        }
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {rootAdminMessage && <p className="text-green-500 mt-4">{rootAdminMessage}</p>}
      </CardContent>
    </Card>
  );
}
