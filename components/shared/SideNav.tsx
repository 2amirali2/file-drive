"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { FileIcon, StarIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import clsx from "clsx"

const SideNav = () => {
  const pathname = usePathname()

  return (
    <div className="w-40 flex flex-col gap-4">
      <Button
        variant={"link"}
        className={clsx("flex gap-2", {
          "text-blue-500": pathname.includes("/dashboard/files"),
        })}
      >
        <Link href={"/dashboard/files"}>
          <FileIcon /> All Files
        </Link>
      </Button>

      <Button
        variant={"link"}
        className={clsx("flex gap-2", {
          "text-blue-500": pathname.includes("/dashboard/favorites"),
        })}
      >
        <Link href={"/dashboard/favorites"}>
          <StarIcon /> Favorites
        </Link>
      </Button>
    </div>
  )
}
export default SideNav
