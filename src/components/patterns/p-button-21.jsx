import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"

export function Pattern() {
  return (
    <Button variant="ghost">Logout
            <LogOutIcon aria-hidden="true" />
    </Button>
  );
}