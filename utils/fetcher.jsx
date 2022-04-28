import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// function Redirect({ to }) {
//   const router = useRouter();

//   useEffect(() => {
//     router.push(to);
//   }, [to]);

//   return console.log("redirect");
// }

export default function fetcher(url, data) {
  const promiseFetcher = fetch(window.location.origin + url, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => result);
  return promiseFetcher;
}
