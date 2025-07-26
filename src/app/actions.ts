'use server';

import {
  generateBookRecommendations,
  type GenerateBookRecommendationsInput,
} from '@/ai/flows/generate-book-recommendations';
import { useToast } from '@/hooks/use-toast';

export async function getBookRecommendations(input: GenerateBookRecommendationsInput) {
  try {
    const result = await generateBookRecommendations(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting book recommendations:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
