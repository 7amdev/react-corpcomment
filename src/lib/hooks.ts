import { useContext } from "react";
import { FeedbackContext } from "../contexts/feedbackContext";

export function useFeedbackContext(component_name: string) {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "Check if component <" +
        component_name +
        "> is a child of <FeedbackProvider> component"
    );
  }
  return context;
}
