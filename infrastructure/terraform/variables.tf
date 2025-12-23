variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "budget_limit" {
  description = "Monthly budget limit in USD"
  type        = number
  default     = 50
}

variable "budget_email" {
  description = "Email address for budget alerts"
  type        = string
  default     = "student@email.com"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
}

