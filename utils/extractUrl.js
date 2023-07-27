export default function extractURLFromString(string) {
  const anchorTagRegex = /<a.*?href="(.*?)".*?>(.*?)<\/a>/i;
  const extractedString = string.replace(anchorTagRegex, (match, url, content) => content);

  return extractedString;
}