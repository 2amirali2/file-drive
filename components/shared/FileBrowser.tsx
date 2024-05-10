"use client"

import { api } from "@/convex/_generated/api"
import { useOrganization, useUser } from "@clerk/nextjs"
import UploadButton from "@/components/shared/UploadButton"
import { useQuery } from "convex/react"
import FileCard from "@/components/shared/FileCard"
import Image from "next/image"
import { GridIcon, Loader2, RowsIcon } from "lucide-react"
import Searchbar from "@/components/shared/Searchbar"
import { useState } from "react"
import { DataTable } from "./FileToggle"
import { columns } from "./Columns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Placeholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <Image
        alt="an image of a picture and directory icon"
        width="300"
        height="300"
        src="/empty.svg"
      />
      <div className="text-2xl">You have no files, upload one now</div>
      <UploadButton />
    </div>
  )
}

const FileBrowser = ({
  title,
  favoritesOnly,
  deletedOnly,
}: {
  title: string
  favoritesOnly?: boolean
  deletedOnly?: boolean
}) => {
  const organization = useOrganization()
  const user = useUser()
  const [query, setQuery] = useState("")

  let orgId: string | undefined = undefined
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  )

  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId, query, favorites: favoritesOnly, deletedOnly } : "skip"
  )
  const isLoading = files === undefined

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorited: (favorites ?? []).some(
        (favorite) => favorite.fileId === file._id
      ),
    })) ?? []

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        <Searchbar query={query} setQuery={setQuery} />

        <UploadButton />
      </div>
      <Tabs defaultValue="Grid">
        <TabsList className="mb-2">
          <TabsTrigger value="Grid" className="flex gap-2 items-center">
            <GridIcon />
            Grid
          </TabsTrigger>
          <TabsTrigger value="Table" className="flex gap-2 items-center">
            <RowsIcon />
            Table
          </TabsTrigger>
        </TabsList>
        {isLoading && (
          <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
            <div className="text-2xl">Loading your images...</div>
          </div>
        )}
        <TabsContent value="Grid">
          <div className="grid grid-cols-3 gap-4">
            {modifiedFiles?.map((file) => (
              <FileCard key={file._id} file={file} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Table">
          <DataTable columns={columns} data={modifiedFiles} />
        </TabsContent>
      </Tabs>

      {files?.length === 0 && <Placeholder />}
    </div>
  )
}

export default FileBrowser
