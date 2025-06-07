export const validateEmail = (email: string): boolean | string => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email) || 'Please enter a valid email address'
}

export const validatePassword = (password: string): boolean | string => {
  if (password.length < 6) return 'Password must be at least 6 characters'
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter'
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number'
  return true
}

export const validateName = (name: string): boolean | string => {
  if (name.length < 2) return 'Name must be at least 2 characters'
  return true
}

export const validateJobTitle = (title: string): boolean | string => {
  if (title.length < 5) return 'Title must be at least 5 characters'
  return true
}

export const validateJobDescription = (description: string): boolean | string => {
  if (description.length < 20) return 'Description must be at least 20 characters'
  return true
}

export const validateSalary = (salary: number): boolean | string => {
  if (salary < 0) return 'Salary must be positive'
  if (salary > 1000000) return 'Salary must be less than $1,000,000'
  return true
}

export const validateSkills = (skills: string): boolean | string => {
  if (!skills.trim()) return 'Skills are required'
  return true
}