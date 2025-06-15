export function extractTranslatedText(responseString: string): string | null {
  const regex = /"translatedText":\s*"([^"]*)"/;

  const match = responseString.match(regex);

  return match ? match[1] : responseString;
}

export { fastUzbekTranslator } from "./fastTranslator";
