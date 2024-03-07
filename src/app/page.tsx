"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function HomePage() {
	const [data, setData] = useState<string>();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm();

	const fetchDownloads = async (data: FieldValues) => {
		const { data: weeklyDownloads } = await axios.post("/api", data);
		// console.log(data);
		setData(weeklyDownloads);
		reset();
	};

	return (
		<main className="container mt-4 text-center">
			<h1 className="text-3xl my-6 font-bold">Weekly Downloads of an NPM Package</h1>
			<form onSubmit={handleSubmit(fetchDownloads)} className="flex gap-4">
				<Input {...register("pkg", { required: "Please enter a package name" })} type="text" placeholder="Enter a package name" />
				{errors.input && <p className="text-red-500">Please enter a package name</p>}
				<Button disabled={isSubmitting} onClick={fetchDownloads} type="submit">
					{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Submit
				</Button>
			</form>
			{data && (
				<h3 className="mt-4 text-2xl">
					This package has <strong>{data}</strong> weekly downloads
				</h3>
			)}
		</main>
	);
}
