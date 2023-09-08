interface GraphQLError {
  errors?: {
    message?: string
    path?: string[]
    extensions?: { code?: string }
  }[]
}

export const formatError = (error: Error): string => {
  if (error.name === "RelayNetwork") {
    const err = error as {
      source?: GraphQLError
    }
    const messages = err.source?.errors
      ?.map(e => {
        let message = ""
        if (e.extensions?.code) message += `${e.extensions.code}: `
        if (e.path?.length) message += `(${e.path.join(".")}): `
        if (e.message) message += e.message
        return message
      })
      .filter(Boolean)
    if (messages?.length) {
      return messages.join("; ")
    }
  }

  return error.message
}
