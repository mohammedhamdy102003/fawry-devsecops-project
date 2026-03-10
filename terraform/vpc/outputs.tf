output "vpc_id" {
  description = "The ID of the VPC created"
  value       = aws_vpc.main.id
}

output "private_subnet_ids" {
  description = "A list of the IDs of the private subnets"
  value       = aws_subnet.private[*].id
}

output "public_subnet_ids" {
  description = "A list of the IDs of the public subnets"
  value       = aws_subnet.public[*].id
}
