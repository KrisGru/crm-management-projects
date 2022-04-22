import { useRouter } from "next/router";
import { useEffect } from "react";

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return console.log("redirect");
}

export default function fetcher(url, data) {
  fetch(window.location.origin + url, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      switch (
        res.from //from is added property in API
      ) {
        case "SIGNIN":
          return <Redirect to="/dashboard" />;
        case "CREATE":
          return res, (location.href = "http://localhost:3000/dashboard");
        default:
          throw new Error("Error in utils -> fetcher");
      }
    });
}
