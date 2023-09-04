interface ErrorMessageProps {
  error: string
}

export const Error = ({error}: ErrorMessageProps) => {
  return (
    <p className="text-center text-red-600">{error}</p>
  )
}