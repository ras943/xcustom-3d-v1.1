
import { Injectable } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // IMPORTANT: The API key is sourced from an environment variable.
    // Do not hardcode API keys in the application.
    // The build process for the Applet environment will handle this variable.
    // FIX: Simplified API key initialization to directly use the environment variable as per guidelines.
    this.ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
  }

  async generateProductDescription(productName: string): Promise<string> {
    // FIX: Removed unnecessary check for API_KEY, assuming it's always available in the environment.
    try {
      const prompt = `Generate a compelling, short and exciting product description for a 3D printed item called "${productName}". Focus on its uniqueness and customizability. Keep it under 40 words.`;
      
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      console.error('Error generating description with Gemini API:', error);
      return 'Failed to generate description. Please try again later.';
    }
  }
}
