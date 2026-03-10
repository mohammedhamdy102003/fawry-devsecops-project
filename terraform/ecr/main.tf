resource "aws_ecr_repository" "main" {
    for_each = toset(var.repository_names)
    name = "${var.project_name}-${each.value}"
    image_scanning_configuration {
      scan_on_push = true
    }
    image_tag_mutability = "MUTABLE"
    tags = {
    Name = "${var.project_name}-${each.value}-ecr"
  }
}
resource "aws_ecr_lifecycle_policy" "main" {
  for_each   = toset(var.repository_names)
  repository = aws_ecr_repository.main[each.value].name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last 10 images",
            "selection": {
                "tagStatus": "any",
                "countType": "imageCountMoreThan",
                "countNumber": 10
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}
