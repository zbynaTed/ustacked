export default function beautifyErrorMessage(message) {
  if (!message) return;

  let alteredMessage = message.replaceAll('"', "");
  const firstLetter = alteredMessage[0].toUpperCase();
  return `${firstLetter}${alteredMessage.slice(1, alteredMessage.length)}.`;
}
