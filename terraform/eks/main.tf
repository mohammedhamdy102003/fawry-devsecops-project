resource "aws_eks_cluster" "main" {
    name     = "${var.project_name}-eks-cluster"
    role_arn = var.cluster_role_arn  # اتصلحت هنا
    version  = "1.29"

    vpc_config {
      subnet_ids              = var.private_subnet_ids
      endpoint_private_access = true
      endpoint_public_access  = true
    }
}

resource "aws_eks_node_group" "main" {
    cluster_name  = aws_eks_cluster.main.name
    node_role_arn = var.node_role_arn
    subnet_ids    = var.private_subnet_ids
    
    node_group_name = "${var.project_name}-node-group" 
    scaling_config {
      desired_size = 2
      max_size     = 3
      min_size     = 1
    }

    instance_types = ["t3.medium"]
    capacity_type  = "ON_DEMAND"

    depends_on = [ 
      aws_eks_cluster.main 
    ]
}
