-- Core User Table (Minimal Structure)

CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash CHAR(60) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_refresh_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    refresh_token VARCHAR(512) NOT NULL,
    device_info VARCHAR(255),
    ip_address VARCHAR(45),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_token (refresh_token)
);


-- Indexes
-- CREATE UNIQUE INDEX idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS user_event_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    event_type ENUM(
        'login', 'logout', 'failed_login', 'register', 'refresh_token', 'password_reset', 'profile_update', 'other'
    ) NOT NULL,
    event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    device_info VARCHAR(255),
    user_agent VARCHAR(512),
    location VARCHAR(255),
    metadata JSON,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_event_user_time (user_id, event_time)
);

-- Recommended Related Tables (Using Foreign Keys)
-- 1. Phone Numbers (1:1 or 1:Many)
CREATE TABLE IF NOT EXISTS user_phones (
    user_id CHAR(36) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    verified BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id, phone),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index for phone lookups
-- CREATE INDEX idx_user_phones_number ON user_phones(phone);

-- 2. Authentication Methods (Supports OAuth/Social Logins)
CREATE TABLE IF NOT EXISTS auth_providers (
    user_id CHAR(36) NOT NULL,
    provider ENUM('email', 'google', 'linkedin') NOT NULL,
    provider_id VARCHAR(255), -- External provider's user ID
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP,
    PRIMARY KEY (user_id, provider),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Profile Data (1:1 Relationship)

CREATE TABLE IF NOT EXISTS user_profiles (
    user_id CHAR(36) PRIMARY KEY,
    full_name VARCHAR(255),
    avatar_url VARCHAR(512),
    timezone VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
