# Full Stack Application

This is a full-stack application with a React frontend and FastAPI backend, deployed on AWS infrastructure.

## Project Structure

```
my-project/
├── frontend/                     # React + Vite project
├── backend/                      # FastAPI backend project
├── infrastructure/               # AWS CloudFormation templates
└── .github/                      # GitHub Actions workflows
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Deployment

The application uses GitHub Actions for automated deployments to different environments:

- Development: Triggered on push to `develop` branch
- Staging: Triggered on push to `staging` branch
- Production: Triggered on push to `main` branch

## Infrastructure

The infrastructure is managed using AWS CloudFormation. Templates can be found in the `infrastructure/cloudformation` directory.

## Environment Variables

- Frontend: `.env`, `.env.staging`, `.env.production`
- Backend: `.env`, `.env.staging`, `.env.production`

## Contributing

1. Create a new branch from `develop`
2. Make your changes
3. Submit a pull request

## License

MIT 