
module "vpc" {
  source               = "./vpc"
  project_name         = var.project_name
  cluster_name         = var.cluster_name
  vpc_cidr             = var.vpc_cidr
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  availability_zones   = var.availability_zones
}

module "ecr" {
  source           = "./ecr"
  project_name     = var.project_name
  repository_names = var.repository_names
}

