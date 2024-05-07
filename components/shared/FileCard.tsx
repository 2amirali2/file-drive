import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { Button } from "../ui/button"
import FileCardAction from "./FileCardAction"
import { ReactNode } from "react"
import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react"
import Image from "next/image"

function getFileUrl(fileId: Id<"_storage">): string {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`
}

// d07920d6-4082-4614-bf45-4b8bbe769127

const FileCard = ({ file }: { file: Doc<"files"> }) => {
  const typesIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>
  
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2">
          {" "}
          <div>{typesIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardAction file={file} />
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

        {file.type === 'csv' && <GanttChartIcon className="h-20 w-20" />}
        {file.type === 'pdf' && <FileTextIcon className="h-20 w-20" />}
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Button onClick={() => {
          // open a new tab to the file location on convex
          window.open(getFileUrl(file.fileId), "_blank")
        }}>Download</Button>
      </CardFooter>
    </Card>
  )
}
export default FileCard
