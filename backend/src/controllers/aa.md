# Updated API curl Examples

## User Endpoints

### Get User Profile
```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_USER_TOKEN_HERE"
```

### Update User Profile
```bash
curl -X PUT http://localhost:3000/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_USER_TOKEN_HERE" \
  -d '{
    "name": "Updated Name",
    "email": "updated.email@example.com"
  }'
```

### Upload Resume
```bash
curl -X POST http://localhost:3000/api/users/resume \
  -H "Authorization: Bearer YOUR_USER_TOKEN_HERE" \
  -F "resume=@/path/to/your/resume.pdf"
```

## Applications Endpoints

### Apply to a Job
```bash
curl -X POST http://localhost:3000/api/applications/jobs/1 \
  -H "Authorization: Bearer YOUR_USER_TOKEN_HERE"
```

### Get User Applications
```bash
curl -X GET http://localhost:3000/api/applications \
  -H "Authorization: Bearer YOUR_USER_TOKEN_HERE"
```

### Get Application Details
```bash
curl -X GET http://localhost:3000/api/applications/1 \
  -H "Authorization: Bearer YOUR_USER_TOKEN_HERE"
```

### Update Application Status (Recruiter only)
```bash
curl -X PUT http://localhost:3000/api/applications/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_RECRUITER_TOKEN_HERE" \
  -d '{
    "status": "accepted"
  }'
```

## Testing Auth and API Health

### Health Check
```bash
curl -X GET http://localhost:3000/api/health
```

### Login (for getting token)
```bash
curl -X POST http://localhost:3000/api/auth/login/user \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "securepassword123"
  }'
```