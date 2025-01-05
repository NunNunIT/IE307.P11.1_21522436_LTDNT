export * from "./Colors";
export * from "./enums";

const GOOGLE_SPEECH_TO_TEXT_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_SPEECH_TO_TEXT_API_KEY as string
if (!GOOGLE_SPEECH_TO_TEXT_API_KEY) {
  throw new Error("GOOGLE_SPEECH_TO_TEXT_API_KEY is not set")
}

export { GOOGLE_SPEECH_TO_TEXT_API_KEY }