# Cloud Dunkin' POS Pro ☁️

A complete cloud-backed web application for Point of Sale (POS) operations, built with AWS serverless technologies. This system enables authenticated users to manage menu items, process orders, and track inventory through a modern, scalable cloud infrastructure.

## 📋 Functional Requirements

### Core Entity CRUD Operations
The system provides full Create, Read, Update, Delete (CRUD) operations for three core entities:

- **Menu Items**: Authenticated users can create, view, update, and delete menu items (beverages, donuts, breakfast items, etc.)
- **Orders**: Users can create new orders and retrieve order history with order details, totals, and timestamps
- **Inventory**: Users can manage inventory items, track quantities, and update stock levels

### Public Read-Only Listing Page
- **Public Menu Page**: A read-only menu listing page accessible to all users without authentication
- Served through **CloudFront CDN** for global performance and caching
- Displays menu items with images, prices, categories, and descriptions

### Image Upload & Storage
- **Image Upload**: Authenticated users can upload images for menu items
- **Cloud Object Storage**: Images are stored in **AWS S3** buckets
- **CDN Delivery**: Images are served through **CloudFront CDN** for fast, global access
- Presigned URLs are generated for secure, direct-to-S3 uploads

## 🏗️ Non-Functional Requirements

### Cloud Deployment with HTTPS
- **Deployed in AWS Cloud**: All components are hosted on AWS infrastructure
- **HTTPS Enforcement**: All traffic is encrypted via **CloudFront** with automatic HTTP to HTTPS redirection
- **Global CDN**: Content is distributed globally through CloudFront edge locations

### Serverless Components
- **AWS Lambda Functions**: Backend API is built entirely with serverless Lambda functions
- **API Gateway**: RESTful API endpoints are exposed through AWS API Gateway
- **Event-Driven Architecture**: Functions are triggered by HTTP requests and scale automatically

### Managed Database
- **AWS DynamoDB (NoSQL)**: Fully managed NoSQL database service
- **Pay-per-Request Billing**: On-demand capacity mode for cost efficiency
- **Three Tables**: Separate tables for Menu, Orders, and Inventory entities

### Observability
- **CloudWatch Logs**: All Lambda functions log to CloudWatch for debugging and monitoring
- **CloudWatch Metrics**: Real-time metrics dashboard tracking:
  - Lambda invocations, errors, and duration
  - CloudFront requests and cache hit ratios
  - DynamoDB read/write capacity usage
- **CloudWatch Dashboard**: Pre-configured dashboard for system health monitoring

### Cost Control
- **AWS Budgets**: Monthly budget set at $50 with email alerts
- **Budget Alerts**: Notifications at 80% and 100% of budget threshold
- **Cost Optimization**: 
  - Pay-per-use Lambda and DynamoDB pricing
  - S3 Intelligent Tiering for automatic cost optimization
  - CloudFront caching to reduce origin requests

**Estimated Monthly Cost**: $25-35 (within free tier for low usage)

## 🛠️ Tech Stack

### Frontend
- **Static Site**: HTML, CSS, JavaScript (vanilla JS)
- **Hosting**: AWS S3 bucket for static file storage
- **CDN**: CloudFront for global content delivery and caching
- **Framework**: No framework dependencies (lightweight and fast)

### Backend
- **Serverless Functions**: AWS Lambda (Node.js 18.x runtime)
- **API Framework**: Serverless Framework for deployment and configuration
- **API Gateway**: AWS API Gateway for RESTful API endpoints
- **Authentication**: AWS Cognito (ready for integration)

### Database
- **NoSQL Database**: AWS DynamoDB
- **Tables**: 
  - `dunkin-pos-backend-menu-{stage}` - Menu items
  - `dunkin-pos-backend-orders-{stage}` - Order records
  - `dunkin-pos-backend-inventory-{stage}` - Inventory items

### Storage
- **Object Storage**: AWS S3
  - Frontend bucket: Static website files
  - Images bucket: Menu item images and media files
- **CDN**: CloudFront distributions for both frontend and images

### Infrastructure as Code
- **Terraform**: Infrastructure provisioning and management
- **Serverless Framework**: Backend function deployment and configuration

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USERS (Browser/Devices)                  │
│                             │                               │
│                             ▼                               │
│                    ┌─────────────────┐                     │
│                    │   CloudFront     │  CDN + HTTPS        │
│                    │  (Global Edge)   │  Static Content     │
│                    └─────────────────┘                     │
│                             │                               │
├─────────────────────────────────────────────────────────────┤
│                    AWS Cloud Region                         │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐    │
│  │   S3 Bucket │  │  API Gateway│  │   Lambda@Edge   │    │
│  │  (Frontend) │◄─┤   (REST API)│  │(Authentication) │    │
│  └─────────────┘  └─────────────┘  └─────────────────┘    │
│         │                    │               │             │
│         │                    ▼               ▼             │
│         │          ┌─────────────────┐ ┌─────────────┐    │
│         │          │  Lambda Functions│ │ Cognito     │    │
│         │          │  (Node.js 18.x) │ │ (Auth/Users)│    │
│         │          └─────────────────┘ └─────────────┘    │
│         │                    │               │             │
│         │                    └──────┬────────┘             │
│         │                           ▼                      │
│         │                   ┌─────────────┐                │
│         │                   │ DynamoDB    │                │
│         │                   │ (NoSQL DB)  │                │
│         │                   └─────────────┘                │
│         │                           │                      │
│         └───────────────────────────┼──────────────────────┘
│                                     ▼                       
│                           ┌─────────────────┐              
│                           │  CloudWatch     │              
│                           │ (Logs/Metrics)  │              
│                           └─────────────────┘              
│                                     │                       
│                                     ▼                       
│                           ┌─────────────────┐              
│                           │  AWS Budgets    │              
│                           │  (Cost Control) │              
│                           └─────────────────┘              
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
cloud-dunkin-pos-pro/
├── frontend/
│   ├── index.html          # Complete POS application (single-page app)
│   ├── package.json        # Frontend dependencies
│   └── start-server.*      # Local development server scripts
├── backend/
│   ├── package.json        # Node.js dependencies
│   ├── serverless.yml      # Serverless Framework configuration
│   └── handlers/
│       ├── menu.js         # Menu CRUD operations
│       ├── orders.js       # Order management
│       ├── inventory.js    # Inventory management
│       ├── images.js       # Image upload handlers
│       ├── auth.js         # Authentication handlers
│       └── cors.js         # CORS handling
├── infrastructure/
│   └── terraform/
│       ├── main.tf         # Main infrastructure definitions
│       ├── variables.tf    # Terraform variables
│       └── outputs.tf      # Output values (URLs, IDs, etc.)
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **AWS Account** with appropriate permissions
- **Node.js** 18.x or higher
- **Terraform** 1.5+ installed
- **Serverless Framework** CLI installed globally (`npm install -g serverless`)
- **AWS CLI** configured with credentials

### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/jasmul/cloud-dunkin-pos-pro.git
   cd cloud-dunkin-pos-pro
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure AWS Credentials**
   ```bash
   aws configure
   # Enter your AWS Access Key ID
   # Enter your AWS Secret Access Key
   # Set default region: us-east-1
   ```

### Local Development

#### Running the Frontend Locally

**Important:** To avoid CORS errors, run the frontend through a local web server (not `file://`).

**Option 1: Using npm (Recommended)**
```bash
cd frontend
npm install  # First time only
npm start    # Starts server on http://localhost:8080
```

**Option 2: Using Python**
```bash
cd frontend
python -m http.server 8080  # Python 3
```

**Option 3: Using Node.js http-server**
```bash
cd frontend
npx http-server -p 8080
```

Then open: **`http://localhost:8080`**

#### Running the Backend Locally (Optional)

```bash
cd backend
npm install
npm start  # Starts serverless-offline on http://localhost:3000
```

The frontend automatically uses `http://localhost:3000` when running on localhost.

## 🚀 Deployment

### Step 1: Deploy Infrastructure (Terraform)

```bash
cd infrastructure/terraform

# Initialize Terraform
terraform init

# Review the plan
terraform plan

# Apply infrastructure
terraform apply
```

**Note:** The Terraform backend S3 bucket is commented out by default. Uncomment it in `main.tf` if you have a state bucket configured.

After deployment, note the outputs:
- `cloudfront_domain_name` - Your CloudFront URL
- `s3_bucket_name` - Frontend S3 bucket name
- `images_cdn_url` - Images CDN URL

### Step 2: Deploy Backend (Serverless)

```bash
cd backend

# Deploy to dev environment
npm run deploy:dev

# Or deploy to production
npm run deploy:prod
```

After deployment, note the API Gateway endpoint URL from the output.

### Step 3: Update Frontend Configuration

Edit `frontend/index.html` and update the `CLOUD_CONFIG` object:

```javascript
const CLOUD_CONFIG = {
    API_ENDPOINT: "https://o6s1muofo4.execute-api.us-east-1.amazonaws.com/dev",
    REGION: "us-east-1"
};
```

### Step 4: Deploy Frontend to S3

```bash
# Get the S3 bucket name from Terraform output
aws s3 sync frontend/ s3://dunkin-pos-frontend-dev/ --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 🔌 API Endpoints

All endpoints are prefixed with your API Gateway URL: `https://o6s1muofo4.execute-api.us-east-1.amazonaws.com/dev`

### Menu Endpoints (CRUD)

- `GET /menu` - Retrieve all menu items (public, no auth required)
- `POST /menu` - Create a new menu item
- `PUT /menu/{id}` - Update a menu item
- `DELETE /menu/{id}` - Delete a menu item

### Order Endpoints

- `GET /orders` - Retrieve all orders
- `POST /orders` - Create a new order

### Inventory Endpoints (CRUD)

- `GET /inventory` - Retrieve inventory status
- `POST /inventory` - Create inventory item
- `PUT /inventory/{id}` - Update inventory quantity
- `DELETE /inventory/{id}` - Delete inventory item

### Image Upload Endpoints

- `POST /images/upload-url` - Get presigned URL for image upload to S3

### Authentication Endpoints

- `POST /auth/login` - User login (Cognito integration ready)
- `GET /auth/verify` - Verify authentication token

## 📊 Monitoring & Observability

### CloudWatch Dashboard

Access the dashboard via AWS Console or use the Terraform output URL.

**Metrics Tracked:**
- Lambda invocations, errors, and duration
- CloudFront requests and cache hit ratio
- DynamoDB read/write capacity

### View Logs

```bash
# View Lambda logs
cd backend
serverless logs -f getMenu --tail

# Or via AWS CLI
aws logs tail /aws/lambda/dunkin-pos-backend-dev-getMenu --follow
```

## 💰 Cost Management

- **Budget Alert**: Configured at $50/month with alerts at 80% and 100%
- **Pay-per-use**: Lambda and DynamoDB use on-demand pricing
- **S3 Intelligent Tiering**: Automatic cost optimization
- **CloudFront Caching**: Reduces origin requests

**Estimated Monthly Cost**: $25-35 (within free tier for low usage)

Update email in `infrastructure/terraform/main.tf` for budget notifications.

## 🔒 Security

- **HTTPS**: Enforced via CloudFront (redirects HTTP to HTTPS)
- **IAM Roles**: Least privilege access for Lambda functions
- **S3 Private**: Access only via CloudFront Origin Access Identity (OAI)
- **CORS**: Configured for API endpoints
- **Authentication**: Ready for Cognito integration

## 🧪 Testing

### Test Menu Endpoint

```bash
# Get menu items (public endpoint)
curl https://o6s1muofo4.execute-api.us-east-1.amazonaws.com/dev

# Create menu item
curl -X POST https://o6s1muofo4.execute-api.us-east-1.amazonaws.com/dev \
  -H "Content-Type: application/json" \
  -d '{"name":"Coffee","price":2.99,"category":"Beverages","description":"Hot coffee"}'
```

### Test Order Endpoint

```bash
curl -X POST https://o6s1muofo4.execute-api.us-east-1.amazonaws.com/dev \
  -H "Content-Type: application/json" \
  -d '{"items":[{"id":"1","name":"Coffee","price":2.99,"quantity":2}],"total":5.98}'
```

## 🔄 CI/CD Pipeline

CI/CD can be configured using GitHub Actions workflows for automated deployment of both frontend and backend components.

**Setup GitHub Secrets:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CLOUDFRONT_DISTRIBUTION_ID`

## 🐛 Troubleshooting

### Frontend not loading
- Check CloudFront distribution status in AWS Console
- Verify S3 bucket has correct files
- Check browser console for CORS errors
- Ensure CloudFront cache is invalidated after updates

### API Gateway errors
- Verify Lambda function is deployed (`serverless list`)
- Check CloudWatch logs for errors
- Ensure DynamoDB tables exist
- Verify API Gateway endpoint URL is correct

### Terraform errors
- Ensure AWS credentials are configured (`aws configure`)
- Check IAM permissions for Terraform operations
- Verify region is correct (us-east-1)

## 📝 Environment Variables

Update these in `backend/serverless.yml`:

- `MENU_TABLE`: DynamoDB table name for menu items
- `ORDERS_TABLE`: DynamoDB table name for orders
- `INVENTORY_TABLE`: DynamoDB table name for inventory
- `IMAGES_BUCKET`: S3 bucket name for images
- `IMAGES_CDN_DOMAIN`: CloudFront domain for images

## 🎯 Next Steps

1. **Configure Cognito**: Set up user pool and integrate authentication
2. **Add Custom Domain**: Configure Route 53 and ACM certificate
3. **Enable WAF**: Add Web Application Firewall for additional security
4. **Set up Alarms**: Configure CloudWatch alarms for errors and thresholds
5. **Add Tests**: Implement unit and integration tests
6. **Optimize Caching**: Fine-tune CloudFront cache policies

## 📄 License

MIT License - see LICENSE file for details

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using AWS Serverless Technologies**