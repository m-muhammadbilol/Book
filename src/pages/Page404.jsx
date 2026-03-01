import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="font-sans">
      404
      <Link to="/">
        <Button
          style={{ width: "100%" }}
          className="text-[10px] font-sans bg-[#DFAF00] ">
          Bosh Sahifaga Qaytish
        </Button>
      </Link>
    </div>
  );
}
