import { api } from "@/constants/appBaseUrl";

// Define types
interface RespondPollInput {
  pollId: number;
  optionId: number;
}

interface RespondPollResponse {
  message: string;
}

// Respond to a poll
export const respondPoll = async (data: RespondPollInput): Promise<RespondPollResponse> => {
  try {
    const response = await api.post('/polls/respond', data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to respond to poll:', error);
    throw error;
  }
};