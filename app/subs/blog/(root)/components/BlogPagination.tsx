"use client";
import { Pagination } from "@mantine/core";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface BlogPaginationProps {
  page: number;
  total: number;
}
export default function BlogPagination({ page, total }: BlogPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [paginationPage, setPaginationPage] = useState(page);

  return (
    <Pagination
      value={paginationPage}
      total={total}
      onChange={(newPage) => {
        params.set("page", newPage.toString());
        setPaginationPage(newPage);
        router.push("?" + params.toString());
      }}
    />
  );
}
