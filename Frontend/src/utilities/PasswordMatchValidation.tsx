export function validatePasswordMatch(password: string, confirmPassword:string): string | null {
  if (password !== confirmPassword) {
    return "Passwords do not match";
    }
    return null;
}