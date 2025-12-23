# Deployment Guide - Cloud Dunkin' POS Pro

## Quick Start Deployment

### Prerequisites Checklist
- [ ] AWS Account created
- [ ] AWS CLI installed and configured (`aws configure`)
- [ ] Node.js 18.x installed
- [ ] Terraform installed
- [ ] Serverless Framework installed (`npm install -g serverless`)

### Step-by-Step Deployment

#### 1. Backend Deployment (Lambda Functions)

```bash
cd backend
npm install
serverless deploy --stage dev
```

**After deployment, note the API Gateway URL from the output.**

#### 2. Update Frontend Configuration

Edit `frontend/index.html` and update line 80-85:

```javascript
const CLOUD_CONFIG = {
    API_ENDPOINT: "https://YOUR_API_GATEWAY_URL.execute-api.us-east-1.amazonaws.com/dev",
    REGION: "us-east-1"
};
```

Replace `YOUR_API_GATEWAY_URL` with the actual URL from step 1.

#### 3. Infrastructure Deployment (Terraform)

```bash
cd infrastructure/terraform
terraform init
terraform plan
terraform apply
```

**Note the outputs:**
- `cloudfront_domain_name` - Your CloudFront URL
- `s3_bucket_name` - S3 bucket name for frontend

#### 4. Frontend Deployment

```bash
# Upload frontend files to S3
aws s3 sync ../frontend/ s3://YOUR_S3_BUCKET_NAME/ --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

Replace:
- `YOUR_S3_BUCKET_NAME` with the bucket name from Terraform output
- `YOUR_DISTRIBUTION_ID` with the CloudFront distribution ID

#### 5. Verify Deployment

1. Visit your CloudFront URL (from Terraform output)
2. Login with any credentials (demo mode)
3. Test adding items to cart and checkout

## Troubleshooting

### Backend Issues

**Lambda function not found:**
```bash
cd backend
serverless info --stage dev
```

**Check logs:**
```bash
serverless logs -f getMenu --tail
```

### Frontend Issues

**S3 bucket not accessible:**
- Verify bucket policy allows CloudFront OAI
- Check CloudFront distribution status

**API calls failing:**
- Verify API Gateway URL in `frontend/index.html`
- Check CORS settings in API Gateway
- Verify Lambda functions are deployed

### Terraform Issues

**State lock error:**
```bash
terraform force-unlock LOCK_ID
```

**Permission errors:**
- Verify AWS credentials: `aws sts get-caller-identity`
- Check IAM permissions for Terraform user

## Environment Variables

### Backend (serverless.yml)
- `MENU_TABLE` - Auto-generated
- `ORDERS_TABLE` - Auto-generated
- `INVENTORY_TABLE` - Auto-generated

### Frontend (index.html)
- `API_ENDPOINT` - Your API Gateway URL
- `REGION` - AWS region (us-east-1)

## Cost Monitoring

1. Visit AWS Budgets console
2. Check budget alerts (configured at $50/month)
3. Monitor CloudWatch dashboard for metrics

## Next Steps

1. **Configure Cognito** for real authentication
2. **Set up custom domain** with Route 53
3. **Enable CloudWatch alarms** for errors
4. **Add monitoring** for production use

