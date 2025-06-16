export function extractTranslatedText(responseString: string): string {
  if (!responseString) return "";
  // Extract text between ** markdown bold markers
  const boldRegex = /\*\*(.*?)\*\*/;
  const boldMatch = responseString.match(boldRegex);
  if (boldMatch) {
    return boldMatch[1];
  }

  // Fallback to the original regex for backward compatibility
  const regex = /"is:\n\n":\s*"([^"]*)"/;
  const match = responseString.match(regex);
  if (match) {
    return match[1];
  }

  return responseString;
}
export function extractTranslatedText2(responseString: string): string {
  const regex = /"translation":\s*"([^"]*)"/;

  const match = responseString.match(regex);

  return match ? match[1] : "";
}
