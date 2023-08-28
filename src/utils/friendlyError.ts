export const formatError = (error: Error): string => {
  if (error.name === "RelayNetwork") {
    const err = error as { source?: { errors?: { message?: string }[] } }
    const messages = err.source?.errors?.map(e => e.message).filter(Boolean)
    if (messages?.length) {
      return messages.join("; ")
    }
  }

  return error.message
}
