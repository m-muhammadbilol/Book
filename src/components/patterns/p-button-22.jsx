import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"

export function Pattern() {
  return (
    <Button variant="destructive">
      <Trash2Icon aria-hidden="true" />Delete Account
          </Button>
  );
}