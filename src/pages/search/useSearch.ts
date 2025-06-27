import { useState } from "react";

export const useSearch = () => {
  const [textInput, setTextInput] = useState("");

  return { textInput, setTextInput };
};
