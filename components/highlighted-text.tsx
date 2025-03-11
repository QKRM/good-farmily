"use client"

interface HighlightedTextProps {
  text: string
  highlight: string
}

export function HighlightedText({ text, highlight }: HighlightedTextProps) {
  if (!highlight.trim()) {
    return <p>{text}</p>
  }

  // Escape special regex characters in the search term
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

  // Create a regular expression that's case insensitive
  const regex = new RegExp(`(${escapedHighlight})`, "gi")

  // Split the text by the regex
  const parts = text.split(regex)

  return (
    <p>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  )
}

