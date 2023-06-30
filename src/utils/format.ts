const formatTextLength = (text: string, charLimit: number) => {
  if (text.length > charLimit) return `${text.slice(0, charLimit)} ...`;

  return text;
};

export { formatTextLength };
