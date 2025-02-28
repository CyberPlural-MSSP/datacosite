"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { SearchIcon } from "lucide-react";

const formSchema = z.object({
  search: z.string().min(2, {
    message: "Search must be at least 2 characters.",
  }),
})

type FormSchema = z.infer<typeof formSchema>;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            Professional PII Search Portal
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Securely search and analyze personally identifiable information across our comprehensive MSSP database. Enterprise-grade security and compliance built-in.
          </p>
          
          <Card className="mx-auto">
            <CardHeader>
              <CardTitle>Search Database</CardTitle>
            </CardHeader>
            <CardContent>
              <Search />
              <div className="mt-4 text-sm text-muted-foreground">
                Search by name, email, phone number, or other identifiers
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <SearchIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Advanced Search</h3>
              <p className="text-sm text-muted-foreground">
                Powerful filtering and matching algorithms
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <SearchIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Real-time Results</h3>
              <p className="text-sm text-muted-foreground">
                Instant access to latest data
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <SearchIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Secure Access</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security protocols
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Search() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="search"
        render={({ field }) => (
          <FormItem className="flex gap-2">
            <FormControl className="flex-1 my-2">
              <Input {...field} />
            </FormControl>
            <Button type="submit">
              <SearchIcon className="h-4 w-4" />
              <span>Search</span>
            </Button>
          </FormItem>
        )}
        />
      </form>
    </Form>
  );
}
