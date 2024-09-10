import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import App from "./App"
import Providers from "./providers"
import { router } from "./routes"

const root = document.getElementById("root")
if (!root) throw new Error("Root element not found")

ReactDOM.createRoot(root).render(
	<Providers>
		<RouterProvider router={router} />
		<App />
	</Providers>,
)
