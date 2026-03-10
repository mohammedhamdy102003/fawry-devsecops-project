variable "repository_names" {
  description = "List of ECR repository names (e.g., ['frontend', 'backend'])"
  type        = list(string)
}

variable "project_name" {
  description = "Project name for tagging"
  type        = string
}


variable "vpc_cidr" {
  type = string
}

variable "public_subnet_cidrs" {
  type = list(string)
}

variable "private_subnet_cidrs" {
  type = list(string)
}

variable "availability_zones" {
  type = list(string)
}
variable "cluster_name" {
  type = string
}
