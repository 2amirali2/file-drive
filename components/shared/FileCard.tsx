import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { Button } from "../ui/button"
import FileCardAction from "./FileCardAction"
import { ReactNode } from "react"
import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { formatRelative, subDays, formatDistance, format } from "date-fns"

function getFileUrl(fileId: Id<"_storage">): string {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`
}

// d07920d6-4082-4614-bf45-4b8bbe769127

const FileCard = ({
  file,
  favorites,
}: {
  file: Doc<"files">
  favorites: Doc<"favorites">[]
}) => {
  const typesIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>

  const isFavorited = favorites.some((favorite) => favorite.fileId === file._id)

  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  })

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2">
          {" "}
          <div className="flex gap-2 text-base font-normal">
            {typesIcons[file.type]}
            {file.name}
          </div>
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardAction isFavorited={isFavorited} file={file} />
        </div>
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center">
        {file.type === "image" && (
          <Image
            src={getFileUrl(file.fileId)}
            alt={file.name}
            width={200}
            height={100}
          />
        )}

        {file.type === "csv" && <GanttChartIcon className="h-20 w-20" />}
        {file.type === "pdf" && <FileTextIcon className="h-20 w-20" />}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6 text-xs">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>ON</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-xs text-gray-700">
          Uploaded {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  )
}
export default FileCard
