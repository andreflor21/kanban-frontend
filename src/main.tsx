import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import App from "./App"
import { router } from "./routes"

const root = document.getElementById("root")
if (!root) throw new Error("Root element not found")

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		},
	},
})

ReactDOM.createRoot(root).render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
		<App />
	</QueryClientProvider>,
)
