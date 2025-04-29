import bcrypt from 'bcrypt';
import logger from './logger';

// Hashing configuration
const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS
  ? parseInt(process.env.BCRYPT_SALT_ROUNDS)
  : 12;

/**
 * Hashes a plain text password
 */
export const hashPassword = async (password: string): Promise<string | null> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    logger.error('Password hashing failed', { error });
    return null;
  }
};

/**
 * Validates a password against a hash
 */
export const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean | null> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    logger.error('Password validation failed', { error });
    return null;
  }
};