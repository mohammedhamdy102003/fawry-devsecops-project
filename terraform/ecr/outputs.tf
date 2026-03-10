output "repository_urls" {
  description = "The URLs of the ECR repositories"
  value       = { for k, v in aws_ecr_repository.main : k => v.repository_url }
}
output "registry_id" {
  description = "The account ID of the registry"
  value       = aws_ecr_repository.main[keys(aws_ecr_repository.main)[0]].registry_id
}
