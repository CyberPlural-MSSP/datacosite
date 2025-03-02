"use client";

import { api } from "~/trpc/react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Button } from "~/components/ui/button" 
import { PlusIcon } from "lucide-react"
import { DialogButton } from "~/app/_components/dialog"
import { Input } from "~/components/ui/input";
import { DialogFooter } from "~/components/ui/dialog";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(4),
  description: z.string().min(15),
});


export default function Settings() {
  const { data: me } = api.admin.me.useQuery();
  const { data: dataTypes, refetch: refetchDataTypes } = api.dataTypes.getAll.useQuery();
  const { mutate: createDataType } = api.dataTypes.create.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const isAdmin = me?.id === 1;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    data.name = data.name.toUpperCase();

    createDataType(data, {
      onSuccess: () => {
        refetchDataTypes();
      },
    });
  }

  return (
    <div className="container w-[90%] mx-auto my-8">
      <h1 className="text-2xl font-bold py-4">Data Types</h1>
      {
        dataTypes?.length ? (
          <Table>
            <TableCaption>A list of registered data types.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                dataTypes?.map((dataType) => (
                  <TableRow key={dataType.id}>
                    <TableCell>{dataType.name}</TableCell>
                    <TableCell>{dataType.description}</TableCell>
                    <TableCell className="text-right">Actions</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        ) : (
          <p>No data types registered.</p>
        )
      }
      {isAdmin && (
        <div>
          <div className="mt-4">
            <DialogButton title="Add Data Type" description="Add a new data type to the system.">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Input type="text" placeholder="Name" {...form.register("name")} />
                <Input type="text" placeholder="Description" {...form.register("description")} />
                
                {form.formState.errors && (
                  <p className="text-red-500">{form.formState.errors.name?.message}</p>
                )}
                <DialogFooter>
                  <Button type="submit">Add</Button>
                </DialogFooter>
              </form>
            </DialogButton>
          </div>
        </div>
      )}
    </div>
  )
}