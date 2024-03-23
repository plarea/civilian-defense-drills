terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

variable "CLOUDFLARE_ACCOUNT_ID" {
  type = string
}

resource "cloudflare_pages_project" "civilian-defense-drills" {
  account_id        = var.CLOUDFLARE_ACCOUNT_ID
  name              = "civilian-defense-drills"
  production_branch = "main"

  build_config {
    build_command   = "npm run build"
    destination_dir = "dist"
  }

  source {
    type = "github"
    config {
      owner                         = "plarea"
      repo_name                     = "civilian-defense-drills"
      production_branch             = "main"
      pr_comments_enabled           = true
      deployments_enabled           = true
      production_deployment_enabled = true
      preview_branch_excludes       = ["main"]
    }
  }

}
