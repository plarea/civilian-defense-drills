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

variable "CLOUDFLARE_API_TOKEN" {
  type = string
}

variable "PROJECT_NAME" {
  type    = string
  default = "civilian-defense-drills"
}

provider "cloudflare" {
  api_token = var.CLOUDFLARE_API_TOKEN
}

resource "cloudflare_pages_domain" "my-domain" {
  account_id   = var.CLOUDFLARE_ACCOUNT_ID
  project_name = var.PROJECT_NAME
  domain       = "cdd.tylerevans.co"
}

resource "cloudflare_pages_project" "civilian-defense-drills" {
  account_id        = var.CLOUDFLARE_ACCOUNT_ID
  name              = var.PROJECT_NAME
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
