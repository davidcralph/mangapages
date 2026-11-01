// random 3-6 second wait between page loads so we don't hammer anyone
export default function sleep() {
  return new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 3001) + 3000));
}
