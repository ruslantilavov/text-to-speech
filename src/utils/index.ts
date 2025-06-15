export function extractTranslatedText(responseString: string): string {
  if (!responseString) return "";
  const regex = /"translatedText":\s*"([^"]*)"/;
  const match = responseString.match(regex);
  if (match) {
    return match[1];
  }
  return responseString;
}
