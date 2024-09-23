const makeApiHeaders = (token: string | null | undefined) => {
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	}
}

export { makeApiHeaders }
