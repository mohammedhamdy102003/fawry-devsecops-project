variable "repository_names" {
  description = "List of ECR repository names (e.g., ['frontend', 'backend'])"
  type        = list(string)
}

variable "project_name" {
  description = "Project name for tagging"
  type        = string
}
