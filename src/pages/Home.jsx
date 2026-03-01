import { TypingAnimation } from "@/components/ui/typing-animation";
import { cn } from "@/lib/utils";
import "../App.css";
import { Toaster } from "../components/ui/sonner";
import { customToast } from "../lib/toast";
import { useEffect, useState } from "react";
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

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  function isLogin() {
    return localStorage.getItem("token") !== null;
  }
  const [selectedImage, setSelectedImage] = useState(null);

  function handleOpen() {
    if (!isLogin()) {
      customToast.error("Avval login qiling");
      navigate("/login");
      return;
    }
    setOpen(true);
  }
  function addData(evt) {
    evt.preventDefault();

    if (!isLogin()) {
      navigate("/login");
      return;
    }
    const formData = new FormData(evt.target);

    const newBook = Object.fromEntries(formData.entries());
    for (let key in newBook) {
      if (!newBook[key]) {
        customToast.error(`${key} to‘ldirilmagan`);
        evt.target.elements[key]?.focus();
        return;
      }
    }

    fetch("https://json-api.uz/api/project/chizmachilik/materials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newBook),
    })
      .then((res) => res.json())
      .then((res) => {
        customToast.success("Kitob qo‘shildi");
        setData((evt) => [...evt, res.data]);
        setOpen(false);
      })
      .catch(() => {
        customToast.error("Xatolik");
      });
  }

  const [data, setData] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    fetch("https://json-api.uz/api/project/chizmachilik/materials")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res.data);
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
  function logout() {
    localStorage.removeItem("token");
    customToast.success("Tizimdan chiqdingiz");
  }

  return (
    <div className="font-semibold text-black ">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <img src="/lgo.png" width={90} alt="logo" />
          <ul className="flex gap-6 text-sm font-medium">
            <li>
              <a href="#home" className="hover:text-amber-600 transition">
                Bosh Sahifa
              </a>
            </li>
            <li>
              <a href="#books" className="hover:text-amber-600 transition">
                Kitoblar
              </a>
            </li>
          </ul>
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </nav>
      </header>
      <Toaster position="top-right" />
      <section
        id="home"
        className="h-[70vh] flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/bok.jpg')" }}>
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Kitob Javoniga Xush Kelibsiz
          </h1>
          <p className="text-lg opacity-90">
            Eng yaxshi kitoblarni toping va qo‘shing
          </p>
        </div>
      </section>

      <div className="flex flex-col items-center justify-center pt-[120px] ">
        <div className="flex items-center text-center">
          <h2
            className="text-[62px] font-[Indie_Flower] text-center font-bold text-amber-900"
            id="books">
            Kitoblar
          </h2>
          <img className="w-[200px] h-[200px]" src="./public/add.png" alt="f" />
        </div>
        <div className="flex items-center justify-center pb-10">
          <Dialog open={open} onOpenChange={setOpen}>
            <Button
              onClick={handleOpen}
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2 rounded-xl shadow-md transition">
              ➕ Kitob Qo‘shish
            </Button>
            <DialogContent>
              <form onSubmit={addData}>
                <DialogHeader>
                  <DialogTitle>Kitob Qo'shish</DialogTitle>
                  <DialogDescription>
                    Berilgan boshliqlarni to‘ldiring
                  </DialogDescription>
                </DialogHeader>

                <FieldGroup>
                  <FieldGroup className="overflow-y-scroll max-h-[500px] bg-slate-50 rounded-4xl p-2">
                    <Field>
                      <FieldLabel htmlFor="name-1">Yozuvchi:</FieldLabel>
                      <Input
                        id="name-1"
                        name="authors"
                        placeholder="Alisher Navoiy"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="username-1">
                        Kitob Sarlavhasi:
                      </FieldLabel>
                      <Input
                        id="username-1"
                        name="title"
                        placeholder="Mehrobdan Chayon"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="username-1">
                        Kitob Rasm uchun URL yoki link Agar link bolmasa Shuni
                        yozing:"https://picsum.photos/300/400?random=1"
                      </FieldLabel>
                      <Input
                        id="username-1"
                        name="cover"
                        placeholder="https://"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="username-1">
                        Nashr Qilingan Yill:
                      </FieldLabel>
                      <Input
                        id="username-1"
                        name="publishedAt"
                        placeholder="2003"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="username-1">
                        Kitob Necha Muqova:
                      </FieldLabel>
                      <Input id="username-1" name="size" placeholder="128" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="username-1">
                        Kitob Qayerga Tegishli:
                      </FieldLabel>
                      <Input
                        id="username-1"
                        name="country"
                        placeholder="O'zbekiston"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="username-1">
                        Kitob Qaysitilda:
                      </FieldLabel>
                      <Input
                        id="username-1"
                        name="language"
                        placeholder="O'zbek"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="username-1">Kitob Turi:</FieldLabel>
                      <Input
                        id="username-1"
                        name="resourceType"
                        placeholder="Maktab Darslikgi, Adabiyot"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="username-1">
                        Kitob Haqida Malumot:
                      </FieldLabel>
                      <Input
                        id="username-1"
                        name="summary"
                        placeholder="Juda ham ajoyib kitob, men bu kitobni Notiqlik muammosi bor insonlarga tafsiya qilgan bo'lar edim."
                      />
                    </Field>
                  </FieldGroup>
                </FieldGroup>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Bekor Qilish
                    </Button>
                  </DialogClose>

                  <Button type="submit">Saqlash</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Dialog
          className="text-white"
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="p-0 text-white text-[44px] max-w-[700px] max-h-[700px] w-full h-full overflow-hidden">
            <img
              src={selectedImage}
              className="w-full h-full object-contain"
              alt="preview"
            />
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-6 mr-auto ml-auto max-w-[1280px] ">
          {data.map((el) => {
            return (
              <div key={el?.id + "_" + el?.title}>
                <div className="justify-center flex flex-col gap-1 items-start  border-4 border-[#E8B700] p-3 rounded-[12px]">
                  <img
                    src={
                      el?.cover ||
                      "https://imgs.search.brave.com/sK9He9kFG51CNtY5K-UZTwc_lg5gRSgPBYiCTF4QBqs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaGFy/cS51ei93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOC8wNi9ib29r/X2ltZ18yLTEuanBn"
                    }
                    alt={el?.title}
                    onClick={() => setSelectedImage(el?.cover)}
                    className="z-30 rounded-[4px] max-w-[250px] h-[200px] cursor-pointer rounded-[4px] object-contain"
                  />
                  <Link to={"/books/" + el?.id}>
                    <Button
                      style={{ width: "105%" }}
                      className="text-[11px] w-full font-sans bg-[#DFAF00] ">
                      Qo'shimcha Malumot
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setEditBook(el)}
                    className="w-full bg-blue-500 text-white">
                    Tahrirlash
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={!!editBook} onOpenChange={() => setEditBook(null)}>
        <DialogContent key={editBook?.id}>
          <form
            onSubmit={(evt) => {
              evt.preventDefault();

              const token = localStorage.getItem("token");
              if (!token) {
                customToast.error("Login qilinmagan");
                navigate("/login");
                return;
              }
              if (!isLogin()) {
                navigate("/login");
                return;
              }
              const formData = new FormData(evt.target);
              const updatedBook = Object.fromEntries(formData.entries());

              fetch(
                `https://json-api.uz/api/project/chizmachilik/materials/${editBook?.id}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  body: JSON.stringify(updatedBook),
                },
              )
                .then((res) => {
                  if (!res.ok) {
                    customToast.error("Xatolik,Bir ozdan so'ng qayta urining!");
                    return;
                  }

                  return res.json();
                })
                .then((res) => {
                  setData((evt) =>
                    evt.map((item) =>
                      item.id === editBook.id
                        ? { ...item, ...updatedBook }
                        : item,
                    ),
                  );
                  customToast.success("Yangilandi");
                  setEditBook(null);
                })
                .catch(() => {
                  customToast.error("Xatolik  Yuzberdi!");
                });
            }}>
            <DialogHeader>
              <DialogTitle>Kitobni Tahrirlash</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-3">
              <Input
                name="title"
                defaultValue={editBook?.title}
                placeholder="Title"
              />

              <Input
                name="authors"
                defaultValue={editBook?.authors}
                placeholder="Authors"
              />

              <Input
                name="cover"
                defaultValue={editBook?.cover}
                placeholder="Image URL"
              />

              <Input
                name="publishedAt"
                defaultValue={editBook?.publishedAt}
                placeholder="Yil"
              />

              <Input
                name="size"
                defaultValue={editBook?.size}
                placeholder="Sahifa soni"
              />

              <Input
                name="country"
                defaultValue={editBook?.country}
                placeholder="Davlat"
              />

              <Input
                name="language"
                defaultValue={editBook?.language}
                placeholder="Til"
              />

              <Input
                name="resourceType"
                defaultValue={editBook?.resourceType}
                placeholder="Turi"
              />
              <Input
                name="summary"
                defaultValue={editBook?.summary}
                placeholder="Kitob Haqida"
              />
            </div>

            <DialogFooter>
              <Button type="submit">Saqlash</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
