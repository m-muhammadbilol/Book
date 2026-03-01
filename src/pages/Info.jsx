import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
export default function Info() {
  const [selectedImage, setSelectedImage] = useState(null);

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    fetch(`https://json-api.uz/api/project/chizmachilik/materials/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        return customToast.error("Error!", {
          description: "Bir ozdan so'ng qayta urining!",
        });
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);
  if (loader) {
    return (
      <div className="z-[999] fixed inset-0 flex flex-col justify-center items-center bg-gray-800 overflow-y-hidden">
        <div className="book">
          <div className="book__pg-shadow"></div>
          <div className="book__pg"></div>
          <div className="book__pg book__pg--2"></div>
          <div className="book__pg book__pg--3"></div>
          <div className="book__pg book__pg--4"></div>
          <div className="book__pg book__pg--5"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline">← Bosh sahifaga qaytish</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <img
              onClick={() => setSelectedImage(data.cover)}
              src={
                data.cover ||
                "https://imgs.search.brave.com/sK9He9kFG51CNtY5K-UZTwc_lg5gRSgPBYiCTF4QBqs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaGFy/cS51ei93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOC8wNi9ib29r/X2ltZ18yLTEuanBn"
              }
              alt="book"
              className="w-full max-w-[400px] rounded-lg border shadow-sm cursor-pointer"
            />
            <label className="text-[10px]">Rasmni ustiga bosing</label>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {data.title}
            </h1>

            <div className="flex flex-col gap-3 text-gray-700">
              <InfoItem label="Yozuvchi" value={data.authors} />
              <InfoItem label="Nashr yili" value={data.publishedAt} />
              <InfoItem label="Betlar soni" value={`${data.size} bet`} />
              <InfoItem label="Davlat" value={data.country} />
              <InfoItem label="Til" value={data.language} />
              <InfoItem label="Turi" value={data.resourceType} />
              <InfoItem label="Haqida" value={data.summary} />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="p-0 max-w-[800px]">
          <img
            src={selectedImage}
            alt="preview"
            className="w-full h-auto object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
function InfoItem({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">{label}:</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}
