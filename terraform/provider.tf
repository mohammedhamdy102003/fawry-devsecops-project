terraform {
required_providers {
aws = {
source  = "hashicorp/aws"
version = "~> 5.0"
}
}
backend "s3" {
bucket         = "mohammed-hamdy-terraform-2026"
key            = "dev/vpc/terraform.tfstate"
region         = "us-east-1"
dynamodb_table = "terraform-locking"
encrypt        = true
}
}
provider "aws" {
region = "us-east-1"
}
