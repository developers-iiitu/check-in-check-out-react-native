export function rollValidator(roll) {
  console.log("roll",roll)
  if (!roll) return "Roll no. can't be empty."
  if (roll.length !== 5) return 'Enter a valid roll no.'
  return ''
}