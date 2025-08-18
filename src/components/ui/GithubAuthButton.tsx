import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { Link } from "react-router-dom"



export function GithubAuthButton() {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
  return (
    <Link to={`https://github.com/login/oauth/authorize?client_id=${clientId}`} target="_blank">
      <Button role="link" variant="outline" type="button" className="w-full">
        <Github className="size-5 fill-black" />
      </Button>
    </Link>
  )
}
