import { NextResponse } from "next/server";
import OpenAI from "openai";
import { generatePersona, PersonaConfigurationError, PersonaInputError, validateQuestionnaireAnswers } from "../../../lib/ai/persona";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const answers = validateQuestionnaireAnswers(body && typeof body === "object" && "answers" in body ? body.answers : undefined);
    const persona = await generatePersona(answers);
    return NextResponse.json({ persona });
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof PersonaInputError) return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid JSON request body." }, { status: 400 });
    if (error instanceof PersonaConfigurationError) return NextResponse.json({ error: error.message }, { status: 500 });
    if (error instanceof OpenAI.APIError) {
      if (error.status === 404 || error.code === "model_not_found") return NextResponse.json({ error: "The configured model is unavailable to this API account. Check OPENAI_MODEL and account access." }, { status: 503 });
      if (error.status === 401 || error.status === 403) return NextResponse.json({ error: "The server could not authenticate with the configured OpenAI API key." }, { status: 500 });
      if (error.status === 429) return NextResponse.json({ error: "The OpenAI API is temporarily rate-limited. Please try again." }, { status: 429 });
    }
    console.error("Persona generation failed", error);
    return NextResponse.json({ error: "Unable to create a Veil persona right now. Please try again." }, { status: 502 });
  }
}
